package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.regex.Pattern;

/**
 * Advanced Lisp-style temporal script parser with formal grammar
 * 
 * Grammar:
 * temporal_expr := '(' command_type args* ')'
 * command_type := 'PSI' | 'COLLAPSE' | 'OBSERVE' | 'MOV' | 'HERO' | 'CREATE' | etc.
 * args := atom | temporal_expr | position | hero_ref
 * atom := IDENTIFIER | NUMBER | STRING
 * position := '@' NUMBER ',' NUMBER
 * hero_ref := IDENTIFIER | 'HERO:' IDENTIFIER
 * 
 * Examples:
 * (PSI psi1 (MOV Arthur @10,15) (BRANCH alpha) (DELTA_T 3))
 * (COLLAPSE psi1)
 * (OBSERVE psi1 (WHEN (HERO_AT @10,15)))
 * (MOV Arthur @10,15)
 * (HERO Arthur)
 * (CREATE (TYPE ITEM) (NAME "Sword") (POSITION @5,7))
 */
@Component
public class LispTemporalScriptParser {
    
    /**
     * Token types for lexical analysis
     */
    public enum TokenType {
        LPAREN, RPAREN, IDENTIFIER, NUMBER, STRING, POSITION, AT, COMMA, EOF
    }
    
    /**
     * Token class for lexical analysis
     */
    public static class Token {
        private final TokenType type;
        private final String value;
        private final int position;
        
        public Token(TokenType type, String value, int position) {
            this.type = type;
            this.value = value;
            this.position = position;
        }
        
        public TokenType getType() { return type; }
        public String getValue() { return value; }
        public int getPosition() { return position; }
        
        @Override
        public String toString() {
            return String.format("Token(%s, %s, %d)", type, value, position);
        }
    }
    
    /**
     * Abstract Syntax Tree node
     */
    public static abstract class ASTNode {
        public abstract String toString();
    }
    
    /**
     * Atom node (identifier, number, string)
     */
    public static class AtomNode extends ASTNode {
        private final String value;
        private final TokenType type;
        
        public AtomNode(String value, TokenType type) {
            this.value = value;
            this.type = type;
        }
        
        public String getValue() { return value; }
        public TokenType getType() { return type; }
        
        @Override
        public String toString() {
            return value;
        }
    }
    
    /**
     * Position node (@x,y)
     */
    public static class PositionNode extends ASTNode {
        private final int x;
        private final int y;
        
        public PositionNode(int x, int y) {
            this.x = x;
            this.y = y;
        }
        
        public int getX() { return x; }
        public int getY() { return y; }
        
        @Override
        public String toString() {
            return "@" + x + "," + y;
        }
    }
    
    /**
     * Expression node (command with arguments)
     */
    public static class ExpressionNode extends ASTNode {
        private final String command;
        private final List<ASTNode> arguments;
        
        public ExpressionNode(String command, List<ASTNode> arguments) {
            this.command = command;
            this.arguments = arguments;
        }
        
        public String getCommand() { return command; }
        public List<ASTNode> getArguments() { return arguments; }
        
        @Override
        public String toString() {
            StringBuilder sb = new StringBuilder();
            sb.append("(").append(command);
            for (ASTNode arg : arguments) {
                sb.append(" ").append(arg.toString());
            }
            sb.append(")");
            return sb.toString();
        }
    }
    
    /**
     * Command result for compatibility with old parser
     */
    public static class ScriptCommand {
        private final String type;
        private final Object parameters;
        
        public ScriptCommand(String type, Object parameters) {
            this.type = type;
            this.parameters = parameters;
        }
        
        public String getType() { return type; }
        public Object getParameters() { return parameters; }
    }
    
    /**
     * Observation trigger for compatibility
     */
    public static class ObservationTrigger {
        private final String targetPsi;
        private final String condition;
        
        public ObservationTrigger(String targetPsi, String condition) {
            this.targetPsi = targetPsi;
            this.condition = condition;
        }
        
        public String getTargetPsi() { return targetPsi; }
        public String getCondition() { return condition; }
    }
    
    // Lexer state
    private String input;
    private int pos;
    private List<Token> tokens;
    private int tokenPos;
    
    /**
     * Tokenize the input string
     */
    public List<Token> tokenize(String input) {
        this.input = input;
        this.pos = 0;
        this.tokens = new ArrayList<>();
        
        while (pos < input.length()) {
            skipWhitespace();
            
            if (pos >= input.length()) break;
            
            char c = input.charAt(pos);
            
            switch (c) {
                case '(':
                    tokens.add(new Token(TokenType.LPAREN, "(", pos));
                    pos++;
                    break;
                case ')':
                    tokens.add(new Token(TokenType.RPAREN, ")", pos));
                    pos++;
                    break;
                case '@':
                    parsePosition();
                    break;
                case '"':
                    parseString();
                    break;
                default:
                    if (Character.isDigit(c) || c == '-') {
                        parseNumber();
                    } else if (Character.isLetter(c) || c == '_' || c == ':') {
                        parseIdentifier();
                    } else {
                        throw new RuntimeException("Unexpected character: " + c + " at position " + pos);
                    }
            }
        }
        
        tokens.add(new Token(TokenType.EOF, "", pos));
        return tokens;
    }
    
    private void skipWhitespace() {
        while (pos < input.length() && Character.isWhitespace(input.charAt(pos))) {
            pos++;
        }
    }
    
    private void parsePosition() {
        int start = pos;
        pos++; // skip @
        
        StringBuilder sb = new StringBuilder();
        while (pos < input.length() && (Character.isDigit(input.charAt(pos)) || input.charAt(pos) == ',' || input.charAt(pos) == '-')) {
            sb.append(input.charAt(pos));
            pos++;
        }
        
        tokens.add(new Token(TokenType.POSITION, "@" + sb.toString(), start));
    }
    
    private void parseString() {
        int start = pos;
        pos++; // skip opening quote
        
        StringBuilder sb = new StringBuilder();
        while (pos < input.length() && input.charAt(pos) != '"') {
            if (input.charAt(pos) == '\\' && pos + 1 < input.length()) {
                pos++; // skip escape character
                sb.append(input.charAt(pos));
            } else {
                sb.append(input.charAt(pos));
            }
            pos++;
        }
        
        if (pos >= input.length()) {
            throw new RuntimeException("Unterminated string at position " + start);
        }
        
        pos++; // skip closing quote
        tokens.add(new Token(TokenType.STRING, sb.toString(), start));
    }
    
    private void parseNumber() {
        int start = pos;
        StringBuilder sb = new StringBuilder();
        
        if (input.charAt(pos) == '-') {
            sb.append(input.charAt(pos));
            pos++;
        }
        
        while (pos < input.length() && Character.isDigit(input.charAt(pos))) {
            sb.append(input.charAt(pos));
            pos++;
        }
        
        // Handle decimal numbers
        if (pos < input.length() && input.charAt(pos) == '.') {
            sb.append(input.charAt(pos));
            pos++;
            
            while (pos < input.length() && Character.isDigit(input.charAt(pos))) {
                sb.append(input.charAt(pos));
                pos++;
            }
        }
        
        tokens.add(new Token(TokenType.NUMBER, sb.toString(), start));
    }
    
    private void parseIdentifier() {
        int start = pos;
        StringBuilder sb = new StringBuilder();
        
        while (pos < input.length() && (Character.isLetterOrDigit(input.charAt(pos)) || input.charAt(pos) == '_' || input.charAt(pos) == ':')) {
            sb.append(input.charAt(pos));
            pos++;
        }
        
        tokens.add(new Token(TokenType.IDENTIFIER, sb.toString(), start));
    }
    
    /**
     * Parse tokens into AST
     */
    public ASTNode parse(String input) {
        tokenize(input);
        tokenPos = 0;
        
        if (tokens.size() == 1) { // Only EOF token
            throw new RuntimeException("Empty input");
        }
        
        return parseExpression();
    }
    
    private ASTNode parseExpression() {
        Token token = currentToken();
        
        if (token.getType() == TokenType.LPAREN) {
            return parseListExpression();
        } else {
            return parseAtom();
        }
    }
    
    private ASTNode parseListExpression() {
        consume(TokenType.LPAREN);
        
        if (currentToken().getType() == TokenType.RPAREN) {
            consume(TokenType.RPAREN);
            return new ExpressionNode("", Collections.emptyList());
        }
        
        Token commandToken = consume(TokenType.IDENTIFIER);
        String command = commandToken.getValue();
        
        List<ASTNode> arguments = new ArrayList<>();
        
        while (currentToken().getType() != TokenType.RPAREN) {
            arguments.add(parseExpression());
        }
        
        consume(TokenType.RPAREN);
        
        return new ExpressionNode(command, arguments);
    }
    
    private ASTNode parseAtom() {
        Token token = currentToken();
        
        switch (token.getType()) {
            case IDENTIFIER:
                consume(TokenType.IDENTIFIER);
                return new AtomNode(token.getValue(), TokenType.IDENTIFIER);
            case NUMBER:
                consume(TokenType.NUMBER);
                return new AtomNode(token.getValue(), TokenType.NUMBER);
            case STRING:
                consume(TokenType.STRING);
                return new AtomNode(token.getValue(), TokenType.STRING);
            case POSITION:
                consume(TokenType.POSITION);
                return parsePositionValue(token.getValue());
            default:
                throw new RuntimeException("Unexpected token: " + token);
        }
    }
    
    private PositionNode parsePositionValue(String positionStr) {
        // Parse @x,y
        String coords = positionStr.substring(1); // Remove @
        String[] parts = coords.split(",");
        
        if (parts.length != 2) {
            throw new RuntimeException("Invalid position format: " + positionStr);
        }
        
        try {
            int x = Integer.parseInt(parts[0]);
            int y = Integer.parseInt(parts[1]);
            return new PositionNode(x, y);
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid position coordinates: " + positionStr);
        }
    }
    
    private Token currentToken() {
        if (tokenPos >= tokens.size()) {
            return tokens.get(tokens.size() - 1); // Return EOF token
        }
        return tokens.get(tokenPos);
    }
    
    private Token consume(TokenType expectedType) {
        Token token = currentToken();
        if (token.getType() != expectedType) {
            throw new RuntimeException("Expected " + expectedType + " but got " + token.getType() + " at position " + token.getPosition());
        }
        tokenPos++;
        return token;
    }
    
    /**
     * Check if this is a temporal script (starts with parenthesis)
     */
    public boolean isTemporalScript(String script) {
        if (script == null || script.trim().isEmpty()) {
            return false;
        }
        return script.trim().startsWith("(");
    }
    
    /**
     * Parse temporal script into PsiState (compatibility method)
     */
    public PsiState parseTemporalScript(String script) {
        try {
            ASTNode ast = parse(script);
            
            if (!(ast instanceof ExpressionNode)) {
                return null;
            }
            
            ExpressionNode expr = (ExpressionNode) ast;
            
            if (!"PSI".equals(expr.getCommand())) {
                return null;
            }
            
            return convertToPsiState(expr);
            
        } catch (Exception e) {
            return null;
        }
    }
    
    private PsiState convertToPsiState(ExpressionNode expr) {
        List<ASTNode> args = expr.getArguments();
        
        if (args.isEmpty()) {
            return null;
        }
        
        // First argument should be PSI ID
        String psiId = ((AtomNode) args.get(0)).getValue();
        
        PsiState psiState = new PsiState();
        psiState.setPsiId(psiId);
        psiState.setExpression(expr.toString());
        
        // Parse remaining arguments
        for (int i = 1; i < args.size(); i++) {
            ASTNode arg = args.get(i);
            
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String command = subExpr.getCommand();
                
                switch (command) {
                    case "MOV":
                        parseMoveCommand(psiState, subExpr);
                        break;
                    case "BRANCH":
                        if (!subExpr.getArguments().isEmpty()) {
                            psiState.setBranchId(((AtomNode) subExpr.getArguments().get(0)).getValue());
                        }
                        break;
                    case "DELTA_T":
                        if (!subExpr.getArguments().isEmpty()) {
                            psiState.setDeltaT(Integer.parseInt(((AtomNode) subExpr.getArguments().get(0)).getValue()));
                        }
                        break;
                    case "PROB":
                        if (!subExpr.getArguments().isEmpty()) {
                            psiState.setProbability(Double.parseDouble(((AtomNode) subExpr.getArguments().get(0)).getValue()));
                        }
                        break;
                }
            }
        }
        
        return psiState;
    }
    
    private void parseMoveCommand(PsiState psiState, ExpressionNode moveExpr) {
        List<ASTNode> args = moveExpr.getArguments();
        
        if (args.size() >= 2) {
            // Hero name
            psiState.setOwnerHero(((AtomNode) args.get(0)).getValue());
            
            // Position
            if (args.get(1) instanceof PositionNode) {
                PositionNode pos = (PositionNode) args.get(1);
                psiState.setTargetX(pos.getX());
                psiState.setTargetY(pos.getY());
            }
            
            psiState.setActionType("MOV");
        }
    }
    
    /**
     * Parse collapse command (compatibility method)
     */
    public String parseCollapseCommand(String script) {
        try {
            ASTNode ast = parse(script);
            
            if (!(ast instanceof ExpressionNode)) {
                return null;
            }
            
            ExpressionNode expr = (ExpressionNode) ast;
            
            if (!"COLLAPSE".equals(expr.getCommand())) {
                return null;
            }
            
            if (expr.getArguments().isEmpty()) {
                return null;
            }
            
            return ((AtomNode) expr.getArguments().get(0)).getValue();
            
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     * Parse observation trigger (compatibility method)
     */
    public ObservationTrigger parseObservationTrigger(String script) {
        try {
            ASTNode ast = parse(script);
            
            if (!(ast instanceof ExpressionNode)) {
                return null;
            }
            
            ExpressionNode expr = (ExpressionNode) ast;
            
            if (!"OBSERVE".equals(expr.getCommand())) {
                return null;
            }
            
            if (expr.getArguments().size() < 2) {
                return null;
            }
            
            String targetPsi = ((AtomNode) expr.getArguments().get(0)).getValue();
            String condition = expr.getArguments().get(1).toString();
            
            return new ObservationTrigger(targetPsi, condition);
            
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     * Parse basic script command (compatibility method)
     */
    public ScriptCommand parseBasicScript(String script) {
        try {
            ASTNode ast = parse(script);
            
            if (!(ast instanceof ExpressionNode)) {
                return null;
            }
            
            ExpressionNode expr = (ExpressionNode) ast;
            String command = expr.getCommand();
            
            switch (command) {
                case "HERO":
                    return new ScriptCommand("HERO", parseHeroCommand(expr));
                case "MOV":
                    return new ScriptCommand("MOV", parseMoveParameters(expr));
                case "CREATE":
                    return new ScriptCommand("CREATE", parseCreateParameters(expr));
                case "USE":
                    return new ScriptCommand("USE", parseUseParameters(expr));
                case "BATTLE":
                    return new ScriptCommand("BATTLE", parseBattleParameters(expr));
                case "BUILD":
                    return new ScriptCommand("BUILD", parseBuildParameters(expr));
                case "COLLECT":
                    return new ScriptCommand("COLLECT", parseCollectParameters(expr));
                case "RECRUIT":
                    return new ScriptCommand("RECRUIT", parseRecruitParameters(expr));
                case "CAST":
                    return new ScriptCommand("CAST", parseCastParameters(expr));
                case "LEARN":
                    return new ScriptCommand("LEARN", parseLearnParameters(expr));
                case "LEVELUP":
                    return new ScriptCommand("LEVELUP", parseLevelUpParameters(expr));
                case "EXPLORE":
                    return new ScriptCommand("EXPLORE", parseExploreParameters(expr));
                case "EQUIP":
                    return new ScriptCommand("EQUIP", parseEquipParameters(expr));
                case "SIEGE":
                    return new ScriptCommand("SIEGE", parseSiegeParameters(expr));
                case "CAPTURE":
                    return new ScriptCommand("CAPTURE", parseCaptureParameters(expr));
                default:
                    return null;
            }
            
        } catch (Exception e) {
            return null;
        }
    }
    
    private String parseHeroCommand(ExpressionNode expr) {
        if (expr.getArguments().isEmpty()) {
            return "";
        }
        return ((AtomNode) expr.getArguments().get(0)).getValue();
    }
    
    private Map<String, String> parseMoveParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        if (expr.getArguments().size() >= 2) {
            params.put("hero", ((AtomNode) expr.getArguments().get(0)).getValue());
            
            if (expr.getArguments().get(1) instanceof PositionNode) {
                PositionNode pos = (PositionNode) expr.getArguments().get(1);
                params.put("x", String.valueOf(pos.getX()));
                params.put("y", String.valueOf(pos.getY()));
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseCreateParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    } else if (value instanceof PositionNode) {
                        PositionNode pos = (PositionNode) value;
                        params.put("x", String.valueOf(pos.getX()));
                        params.put("y", String.valueOf(pos.getY()));
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseUseParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseBattleParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        if (expr.getArguments().size() >= 2) {
            params.put("attacker", ((AtomNode) expr.getArguments().get(0)).getValue());
            params.put("defender", ((AtomNode) expr.getArguments().get(1)).getValue());
        }
        
        return params;
    }
    
    private Map<String, String> parseBuildParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    } else if (value instanceof PositionNode) {
                        PositionNode pos = (PositionNode) value;
                        params.put("x", String.valueOf(pos.getX()));
                        params.put("y", String.valueOf(pos.getY()));
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseCollectParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseRecruitParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseCastParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseLearnParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseLevelUpParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseExploreParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    } else if (value instanceof PositionNode) {
                        PositionNode pos = (PositionNode) value;
                        params.put("x", String.valueOf(pos.getX()));
                        params.put("y", String.valueOf(pos.getY()));
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseEquipParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseSiegeParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    } else if (value instanceof PositionNode) {
                        PositionNode pos = (PositionNode) value;
                        params.put("x", String.valueOf(pos.getX()));
                        params.put("y", String.valueOf(pos.getY()));
                    }
                }
            }
        }
        
        return params;
    }
    
    private Map<String, String> parseCaptureParameters(ExpressionNode expr) {
        Map<String, String> params = new HashMap<>();
        
        for (ASTNode arg : expr.getArguments()) {
            if (arg instanceof ExpressionNode) {
                ExpressionNode subExpr = (ExpressionNode) arg;
                String key = subExpr.getCommand().toLowerCase();
                
                if (!subExpr.getArguments().isEmpty()) {
                    ASTNode value = subExpr.getArguments().get(0);
                    
                    if (value instanceof AtomNode) {
                        params.put(key, ((AtomNode) value).getValue());
                    }
                }
            }
        }
        
        return params;
    }
} 