#!/bin/bash

# 🧪 Heroes of Time - Unit Test Runner
# ====================================

echo "🧪 Heroes of Time - Unit Test Runner"
echo "===================================="

# Set test environment variables
export SPRING_PROFILES_ACTIVE=test
export JAVA_OPTS="-Xmx2g -Xms512m"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Maven is available
if ! command -v mvn &> /dev/null; then
    print_error "Maven is not installed or not in PATH"
    exit 1
fi

# Check if Java is available
if ! command -v java &> /dev/null; then
    print_error "Java is not installed or not in PATH"
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | awk -F '.' '{print $1}')
if [ "$JAVA_VERSION" -lt 17 ]; then
    print_error "Java 17 or higher is required. Current version: $JAVA_VERSION"
    exit 1
fi

print_info "Java version: $JAVA_VERSION"
print_info "Maven version: $(mvn --version | head -1)"

# Navigate to backend directory
cd backend

print_header "Cleaning and Compiling"
print_info "Cleaning previous build artifacts..."
mvn clean > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to clean project"
    exit 1
fi

print_info "Compiling sources..."
mvn compile > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to compile sources"
    exit 1
fi

print_info "Compiling test sources..."
mvn test-compile > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to compile test sources"
    exit 1
fi

print_success "Compilation successful"

print_header "Running Unit Tests"

# Create test report directory
TEST_REPORT_DIR="target/test-reports"
mkdir -p $TEST_REPORT_DIR

# Run specific test classes
TEST_CLASSES=(
    "PsiStateTest"
    "TemporalEngineServiceTest"
    "TemporalScriptParserTest"
    "TemporalEngineIntegrationTest"
)

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

for TEST_CLASS in "${TEST_CLASSES[@]}"; do
    print_info "Running $TEST_CLASS..."
    
    # Run the test and capture output
    TEST_OUTPUT=$(mvn -Dtest=com.heroesoftimepoc.temporalengine.$TEST_CLASS test 2>&1)
    TEST_RESULT=$?
    
    # Parse test results
    if echo "$TEST_OUTPUT" | grep -q "BUILD SUCCESS"; then
        # Extract test counts
        TESTS_RUN=$(echo "$TEST_OUTPUT" | grep -o "Tests run: [0-9]*" | grep -o "[0-9]*")
        FAILURES=$(echo "$TEST_OUTPUT" | grep -o "Failures: [0-9]*" | grep -o "[0-9]*")
        ERRORS=$(echo "$TEST_OUTPUT" | grep -o "Errors: [0-9]*" | grep -o "[0-9]*")
        
        if [ -z "$TESTS_RUN" ]; then TESTS_RUN=0; fi
        if [ -z "$FAILURES" ]; then FAILURES=0; fi
        if [ -z "$ERRORS" ]; then ERRORS=0; fi
        
        TOTAL_TESTS=$((TOTAL_TESTS + TESTS_RUN))
        
        if [ "$FAILURES" -eq 0 ] && [ "$ERRORS" -eq 0 ]; then
            print_success "$TEST_CLASS: $TESTS_RUN tests passed"
            PASSED_TESTS=$((PASSED_TESTS + TESTS_RUN))
        else
            print_error "$TEST_CLASS: $TESTS_RUN tests run, $FAILURES failures, $ERRORS errors"
            FAILED_TESTS=$((FAILED_TESTS + FAILURES + ERRORS))
        fi
    else
        print_error "$TEST_CLASS: Test execution failed"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    # Save detailed output to file
    echo "$TEST_OUTPUT" > "$TEST_REPORT_DIR/${TEST_CLASS}.log"
done

print_header "Running All Tests Together"
print_info "Running complete test suite..."

# Run all tests together
ALL_TESTS_OUTPUT=$(mvn test 2>&1)
ALL_TESTS_RESULT=$?

# Save complete output
echo "$ALL_TESTS_OUTPUT" > "$TEST_REPORT_DIR/all-tests.log"

print_header "Test Results Summary"

if [ $ALL_TESTS_RESULT -eq 0 ]; then
    print_success "All tests passed successfully!"
    
    # Extract detailed statistics
    TOTAL_TESTS_RUN=$(echo "$ALL_TESTS_OUTPUT" | grep -o "Tests run: [0-9]*" | tail -1 | grep -o "[0-9]*")
    TOTAL_FAILURES=$(echo "$ALL_TESTS_OUTPUT" | grep -o "Failures: [0-9]*" | tail -1 | grep -o "[0-9]*")
    TOTAL_ERRORS=$(echo "$ALL_TESTS_OUTPUT" | grep -o "Errors: [0-9]*" | tail -1 | grep -o "[0-9]*")
    TOTAL_SKIPPED=$(echo "$ALL_TESTS_OUTPUT" | grep -o "Skipped: [0-9]*" | tail -1 | grep -o "[0-9]*")
    
    if [ -z "$TOTAL_TESTS_RUN" ]; then TOTAL_TESTS_RUN=0; fi
    if [ -z "$TOTAL_FAILURES" ]; then TOTAL_FAILURES=0; fi
    if [ -z "$TOTAL_ERRORS" ]; then TOTAL_ERRORS=0; fi
    if [ -z "$TOTAL_SKIPPED" ]; then TOTAL_SKIPPED=0; fi
    
    print_info "📊 Test Statistics:"
    print_info "   Total Tests: $TOTAL_TESTS_RUN"
    print_info "   Passed: $((TOTAL_TESTS_RUN - TOTAL_FAILURES - TOTAL_ERRORS))"
    print_info "   Failed: $TOTAL_FAILURES"
    print_info "   Errors: $TOTAL_ERRORS"
    print_info "   Skipped: $TOTAL_SKIPPED"
    
    # Extract execution time
    EXECUTION_TIME=$(echo "$ALL_TESTS_OUTPUT" | grep -o "Total time: [0-9]*\.[0-9]*" | grep -o "[0-9]*\.[0-9]*")
    if [ -n "$EXECUTION_TIME" ]; then
        print_info "   Execution Time: ${EXECUTION_TIME}s"
    fi
    
else
    print_error "Some tests failed!"
    
    # Show failure details
    if echo "$ALL_TESTS_OUTPUT" | grep -q "FAILURES"; then
        print_error "Failure details:"
        echo "$ALL_TESTS_OUTPUT" | grep -A 10 "FAILURES"
    fi
    
    if echo "$ALL_TESTS_OUTPUT" | grep -q "ERRORS"; then
        print_error "Error details:"
        echo "$ALL_TESTS_OUTPUT" | grep -A 10 "ERRORS"
    fi
fi

print_header "Coverage Report"
print_info "Generating test coverage report..."

# Generate coverage report (if jacoco is configured)
mvn jacoco:report > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_success "Coverage report generated at target/site/jacoco/index.html"
else
    print_warning "Coverage report generation failed (jacoco may not be configured)"
fi

print_header "Test Report Files"
print_info "Detailed test reports saved to:"
for TEST_CLASS in "${TEST_CLASSES[@]}"; do
    if [ -f "$TEST_REPORT_DIR/${TEST_CLASS}.log" ]; then
        print_info "   - $TEST_REPORT_DIR/${TEST_CLASS}.log"
    fi
done
print_info "   - $TEST_REPORT_DIR/all-tests.log"

# Generate summary report
SUMMARY_FILE="$TEST_REPORT_DIR/summary.txt"
cat > "$SUMMARY_FILE" << EOF
Heroes of Time - Unit Test Summary
=================================

Date: $(date)
Total Tests: $TOTAL_TESTS_RUN
Passed: $((TOTAL_TESTS_RUN - TOTAL_FAILURES - TOTAL_ERRORS))
Failed: $TOTAL_FAILURES
Errors: $TOTAL_ERRORS
Skipped: $TOTAL_SKIPPED

Test Classes Executed:
EOF

for TEST_CLASS in "${TEST_CLASSES[@]}"; do
    echo "- $TEST_CLASS" >> "$SUMMARY_FILE"
done

print_info "Summary report saved to: $SUMMARY_FILE"

print_header "Test Validation"

# Check for critical temporal engine components
print_info "Validating temporal engine components..."

CRITICAL_TESTS=(
    "testPsiStateCreation"
    "testPsiStateCollapse"
    "testTemporalScriptParsing"
    "testObservationTriggers"
    "testArtifactEffects"
    "testConflictResolution"
)

for CRITICAL_TEST in "${CRITICAL_TESTS[@]}"; do
    if echo "$ALL_TESTS_OUTPUT" | grep -q "$CRITICAL_TEST"; then
        print_success "✓ $CRITICAL_TEST validated"
    else
        print_warning "⚠ $CRITICAL_TEST not found in test output"
    fi
done

print_header "Recommendations"

if [ $ALL_TESTS_RESULT -eq 0 ]; then
    print_success "🎉 All tests passed! The temporal engine is functioning correctly."
    print_info "Next steps:"
    print_info "1. Run integration tests: ./test-backend-integration.sh"
    print_info "2. Test frontend connectivity: ./test-frontend-backend.sh"
    print_info "3. Deploy to staging environment"
else
    print_error "❌ Tests failed. Please fix the following:"
    print_info "1. Review test logs in $TEST_REPORT_DIR/"
    print_info "2. Fix failing tests"
    print_info "3. Re-run tests"
fi

print_header "Cleanup"
print_info "Cleaning up test artifacts..."
mvn clean > /dev/null 2>&1

echo ""
if [ $ALL_TESTS_RESULT -eq 0 ]; then
    print_success "🎯 Unit test execution completed successfully!"
    exit 0
else
    print_error "🚨 Unit test execution completed with failures!"
    exit 1
fi 