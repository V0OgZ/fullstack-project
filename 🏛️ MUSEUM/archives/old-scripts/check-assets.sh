#!/bin/bash
echo "🔍 Checking Heroes of Time Assets..."
echo "=================================="

echo "🏰 Buildings:"
find frontend/public/assets/buildings -name "*.png" -o -name "*.jpg" | wc -l | xargs echo "  PNG/JPG files:"

echo "🐉 Creatures:"
find frontend/public/assets/creatures -name "*.png" -o -name "*.jpg" | wc -l | xargs echo "  PNG/JPG files:"

echo "🎨 Heroes:"
find frontend/public/assets/heroes -name "*.png" -o -name "*.jpg" | wc -l | xargs echo "  PNG/JPG files:"

echo ""
echo "✅ Asset check complete!"
