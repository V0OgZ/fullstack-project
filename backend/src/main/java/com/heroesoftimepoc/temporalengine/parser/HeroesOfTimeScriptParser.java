// Generated from com/heroesoftimepoc/temporalengine/parser/HeroesOfTimeScript.g4 by ANTLR 4.13.1
package com.heroesoftimepoc.temporalengine.parser;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class HeroesOfTimeScriptParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, PSI_ID=38, 
		DAGGER=39, ODOT=40, PI=41, ARROW=42, TIMELINE_ID=43, SIGN=44, NUMBER=45, 
		IDENTIFIER=46, STRING=47, LPAREN=48, RPAREN=49, COMMA=50, COLON=51, AT=52, 
		WS=53, COMMENT=54, BLOCK_COMMENT=55, ERROR_CHAR=56;
	public static final int
		RULE_script = 0, RULE_temporalScript = 1, RULE_psiState = 2, RULE_observation = 3, 
		RULE_temporalExpression = 4, RULE_collapseCommand = 5, RULE_observationTrigger = 6, 
		RULE_condition = 7, RULE_customCondition = 8, RULE_basicScript = 9, RULE_heroCommand = 10, 
		RULE_movementCommand = 11, RULE_createCommand = 12, RULE_createType = 13, 
		RULE_useCommand = 14, RULE_useType = 15, RULE_target = 16, RULE_battleCommand = 17, 
		RULE_combatant = 18, RULE_hmm3Command = 19, RULE_buildCommand = 20, RULE_recruitCommand = 21, 
		RULE_castCommand = 22, RULE_collectCommand = 23, RULE_learnCommand = 24, 
		RULE_levelUpCommand = 25, RULE_exploreCommand = 26, RULE_equipCommand = 27, 
		RULE_siegeCommand = 28, RULE_captureCommand = 29, RULE_timelineScript = 30, 
		RULE_timelineCommand = 31, RULE_mergeCommand = 32, RULE_timeline = 33, 
		RULE_action = 34, RULE_complexAction = 35, RULE_argumentList = 36, RULE_argument = 37, 
		RULE_position = 38, RULE_deltaTime = 39;
	private static String[] makeRuleNames() {
		return new String[] {
			"script", "temporalScript", "psiState", "observation", "temporalExpression", 
			"collapseCommand", "observationTrigger", "condition", "customCondition", 
			"basicScript", "heroCommand", "movementCommand", "createCommand", "createType", 
			"useCommand", "useType", "target", "battleCommand", "combatant", "hmm3Command", 
			"buildCommand", "recruitCommand", "castCommand", "collectCommand", "learnCommand", 
			"levelUpCommand", "exploreCommand", "equipCommand", "siegeCommand", "captureCommand", 
			"timelineScript", "timelineCommand", "mergeCommand", "timeline", "action", 
			"complexAction", "argumentList", "argument", "position", "deltaTime"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'enters'", "'at'", "'spawns'", "'destroyed'", "'uses'", "'HERO'", 
			"'MOV'", "'CREATE'", "'CREATURE'", "'ITEM'", "'STRUCTURE'", "'BUILDING'", 
			"'USE'", "'SPELL'", "'ABILITY'", "'HERO:'", "'TARGET:'", "'BATTLE'", 
			"'BUILD'", "'PLAYER:'", "'RECRUIT'", "'UNIT'", "'CAST'", "'COLLECT'", 
			"'RESOURCE'", "'LEARN'", "'LEVELUP'", "'SKILL:'", "'EXPLORE'", "'EQUIP'", 
			"'ARTIFACT'", "'SIEGE'", "'CAPTURE'", "'OBJECTIVE'", "'TIMELINE'", "'MERGE'", 
			"'\\u0394t'", null, "'\\u2020'", "'\\u2299'", "'\\u03A0'", null, null, 
			null, null, null, null, "'('", "')'", "','", "':'", "'@'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, "PSI_ID", "DAGGER", "ODOT", "PI", "ARROW", "TIMELINE_ID", 
			"SIGN", "NUMBER", "IDENTIFIER", "STRING", "LPAREN", "RPAREN", "COMMA", 
			"COLON", "AT", "WS", "COMMENT", "BLOCK_COMMENT", "ERROR_CHAR"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "HeroesOfTimeScript.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public HeroesOfTimeScriptParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ScriptContext extends ParserRuleContext {
		public TemporalScriptContext temporalScript() {
			return getRuleContext(TemporalScriptContext.class,0);
		}
		public BasicScriptContext basicScript() {
			return getRuleContext(BasicScriptContext.class,0);
		}
		public TimelineScriptContext timelineScript() {
			return getRuleContext(TimelineScriptContext.class,0);
		}
		public TerminalNode EOF() { return getToken(HeroesOfTimeScriptParser.EOF, 0); }
		public ScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_script; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterScript(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitScript(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitScript(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ScriptContext script() throws RecognitionException {
		ScriptContext _localctx = new ScriptContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_script);
		try {
			setState(84);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PSI_ID:
			case DAGGER:
			case PI:
				enterOuterAlt(_localctx, 1);
				{
				setState(80);
				temporalScript();
				}
				break;
			case T__5:
			case T__6:
			case T__7:
			case T__12:
			case T__17:
			case T__18:
			case T__20:
			case T__22:
			case T__23:
			case T__25:
			case T__26:
			case T__28:
			case T__29:
			case T__31:
			case T__32:
				enterOuterAlt(_localctx, 2);
				{
				setState(81);
				basicScript();
				}
				break;
			case T__34:
			case T__35:
				enterOuterAlt(_localctx, 3);
				{
				setState(82);
				timelineScript();
				}
				break;
			case EOF:
				enterOuterAlt(_localctx, 4);
				{
				setState(83);
				match(EOF);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TemporalScriptContext extends ParserRuleContext {
		public PsiStateContext psiState() {
			return getRuleContext(PsiStateContext.class,0);
		}
		public CollapseCommandContext collapseCommand() {
			return getRuleContext(CollapseCommandContext.class,0);
		}
		public ObservationTriggerContext observationTrigger() {
			return getRuleContext(ObservationTriggerContext.class,0);
		}
		public TemporalScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_temporalScript; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterTemporalScript(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitTemporalScript(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitTemporalScript(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TemporalScriptContext temporalScript() throws RecognitionException {
		TemporalScriptContext _localctx = new TemporalScriptContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_temporalScript);
		try {
			setState(89);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PSI_ID:
				enterOuterAlt(_localctx, 1);
				{
				setState(86);
				psiState();
				}
				break;
			case DAGGER:
				enterOuterAlt(_localctx, 2);
				{
				setState(87);
				collapseCommand();
				}
				break;
			case PI:
				enterOuterAlt(_localctx, 3);
				{
				setState(88);
				observationTrigger();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PsiStateContext extends ParserRuleContext {
		public TerminalNode PSI_ID() { return getToken(HeroesOfTimeScriptParser.PSI_ID, 0); }
		public TerminalNode COLON() { return getToken(HeroesOfTimeScriptParser.COLON, 0); }
		public ObservationContext observation() {
			return getRuleContext(ObservationContext.class,0);
		}
		public TimelineContext timeline() {
			return getRuleContext(TimelineContext.class,0);
		}
		public PsiStateContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_psiState; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterPsiState(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitPsiState(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitPsiState(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PsiStateContext psiState() throws RecognitionException {
		PsiStateContext _localctx = new PsiStateContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_psiState);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91);
			match(PSI_ID);
			setState(92);
			match(COLON);
			setState(93);
			observation();
			setState(95);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TIMELINE_ID) {
				{
				setState(94);
				timeline();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObservationContext extends ParserRuleContext {
		public TerminalNode ODOT() { return getToken(HeroesOfTimeScriptParser.ODOT, 0); }
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public TemporalExpressionContext temporalExpression() {
			return getRuleContext(TemporalExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public ObservationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_observation; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterObservation(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitObservation(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitObservation(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ObservationContext observation() throws RecognitionException {
		ObservationContext _localctx = new ObservationContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_observation);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(97);
			match(ODOT);
			setState(98);
			match(LPAREN);
			setState(99);
			temporalExpression();
			setState(100);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TemporalExpressionContext extends ParserRuleContext {
		public DeltaTimeContext deltaTime() {
			return getRuleContext(DeltaTimeContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(HeroesOfTimeScriptParser.ARROW, 0); }
		public ActionContext action() {
			return getRuleContext(ActionContext.class,0);
		}
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TemporalExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_temporalExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterTemporalExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitTemporalExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitTemporalExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TemporalExpressionContext temporalExpression() throws RecognitionException {
		TemporalExpressionContext _localctx = new TemporalExpressionContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_temporalExpression);
		int _la;
		try {
			setState(118);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(102);
				deltaTime();
				setState(104);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==AT) {
					{
					setState(103);
					position();
					}
				}

				setState(106);
				match(ARROW);
				setState(107);
				action();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(109);
				deltaTime();
				setState(110);
				match(ARROW);
				setState(111);
				action();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(113);
				position();
				setState(114);
				match(ARROW);
				setState(115);
				action();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(117);
				action();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CollapseCommandContext extends ParserRuleContext {
		public TerminalNode DAGGER() { return getToken(HeroesOfTimeScriptParser.DAGGER, 0); }
		public TerminalNode PSI_ID() { return getToken(HeroesOfTimeScriptParser.PSI_ID, 0); }
		public CollapseCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_collapseCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCollapseCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCollapseCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCollapseCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CollapseCommandContext collapseCommand() throws RecognitionException {
		CollapseCommandContext _localctx = new CollapseCommandContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_collapseCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(120);
			match(DAGGER);
			setState(121);
			match(PSI_ID);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObservationTriggerContext extends ParserRuleContext {
		public TerminalNode PI() { return getToken(HeroesOfTimeScriptParser.PI, 0); }
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public TerminalNode ARROW() { return getToken(HeroesOfTimeScriptParser.ARROW, 0); }
		public TerminalNode DAGGER() { return getToken(HeroesOfTimeScriptParser.DAGGER, 0); }
		public TerminalNode PSI_ID() { return getToken(HeroesOfTimeScriptParser.PSI_ID, 0); }
		public ObservationTriggerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_observationTrigger; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterObservationTrigger(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitObservationTrigger(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitObservationTrigger(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ObservationTriggerContext observationTrigger() throws RecognitionException {
		ObservationTriggerContext _localctx = new ObservationTriggerContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_observationTrigger);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(123);
			match(PI);
			setState(124);
			match(LPAREN);
			setState(125);
			condition();
			setState(126);
			match(RPAREN);
			setState(127);
			match(ARROW);
			setState(128);
			match(DAGGER);
			setState(129);
			match(PSI_ID);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConditionContext extends ParserRuleContext {
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public DeltaTimeContext deltaTime() {
			return getRuleContext(DeltaTimeContext.class,0);
		}
		public CustomConditionContext customCondition() {
			return getRuleContext(CustomConditionContext.class,0);
		}
		public ConditionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_condition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCondition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCondition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCondition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ConditionContext condition() throws RecognitionException {
		ConditionContext _localctx = new ConditionContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_condition);
		int _la;
		try {
			setState(147);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(131);
				match(IDENTIFIER);
				setState(132);
				match(T__0);
				setState(133);
				position();
				setState(136);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__1) {
					{
					setState(134);
					match(T__1);
					setState(135);
					deltaTime();
					}
				}

				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(138);
				match(IDENTIFIER);
				setState(139);
				match(T__2);
				setState(140);
				position();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(141);
				match(IDENTIFIER);
				setState(142);
				match(T__3);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(143);
				match(IDENTIFIER);
				setState(144);
				match(T__4);
				setState(145);
				match(IDENTIFIER);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(146);
				customCondition();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CustomConditionContext extends ParserRuleContext {
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public CustomConditionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_customCondition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCustomCondition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCustomCondition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCustomCondition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CustomConditionContext customCondition() throws RecognitionException {
		CustomConditionContext _localctx = new CustomConditionContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_customCondition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(150); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(149);
				match(IDENTIFIER);
				}
				}
				setState(152); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==IDENTIFIER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BasicScriptContext extends ParserRuleContext {
		public HeroCommandContext heroCommand() {
			return getRuleContext(HeroCommandContext.class,0);
		}
		public MovementCommandContext movementCommand() {
			return getRuleContext(MovementCommandContext.class,0);
		}
		public CreateCommandContext createCommand() {
			return getRuleContext(CreateCommandContext.class,0);
		}
		public UseCommandContext useCommand() {
			return getRuleContext(UseCommandContext.class,0);
		}
		public BattleCommandContext battleCommand() {
			return getRuleContext(BattleCommandContext.class,0);
		}
		public Hmm3CommandContext hmm3Command() {
			return getRuleContext(Hmm3CommandContext.class,0);
		}
		public BasicScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_basicScript; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterBasicScript(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitBasicScript(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitBasicScript(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BasicScriptContext basicScript() throws RecognitionException {
		BasicScriptContext _localctx = new BasicScriptContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_basicScript);
		try {
			setState(160);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
				enterOuterAlt(_localctx, 1);
				{
				setState(154);
				heroCommand();
				}
				break;
			case T__6:
				enterOuterAlt(_localctx, 2);
				{
				setState(155);
				movementCommand();
				}
				break;
			case T__7:
				enterOuterAlt(_localctx, 3);
				{
				setState(156);
				createCommand();
				}
				break;
			case T__12:
				enterOuterAlt(_localctx, 4);
				{
				setState(157);
				useCommand();
				}
				break;
			case T__17:
				enterOuterAlt(_localctx, 5);
				{
				setState(158);
				battleCommand();
				}
				break;
			case T__18:
			case T__20:
			case T__22:
			case T__23:
			case T__25:
			case T__26:
			case T__28:
			case T__29:
			case T__31:
			case T__32:
				enterOuterAlt(_localctx, 6);
				{
				setState(159);
				hmm3Command();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class HeroCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public HeroCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_heroCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterHeroCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitHeroCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitHeroCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final HeroCommandContext heroCommand() throws RecognitionException {
		HeroCommandContext _localctx = new HeroCommandContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_heroCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(162);
			match(T__5);
			setState(163);
			match(LPAREN);
			setState(164);
			match(IDENTIFIER);
			setState(165);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MovementCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public TerminalNode COMMA() { return getToken(HeroesOfTimeScriptParser.COMMA, 0); }
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public MovementCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_movementCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterMovementCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitMovementCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitMovementCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MovementCommandContext movementCommand() throws RecognitionException {
		MovementCommandContext _localctx = new MovementCommandContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_movementCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(167);
			match(T__6);
			setState(168);
			match(LPAREN);
			setState(169);
			match(IDENTIFIER);
			setState(170);
			match(COMMA);
			setState(171);
			position();
			setState(172);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CreateCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public CreateTypeContext createType() {
			return getRuleContext(CreateTypeContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public CreateCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_createCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCreateCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCreateCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCreateCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CreateCommandContext createCommand() throws RecognitionException {
		CreateCommandContext _localctx = new CreateCommandContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_createCommand);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(174);
			match(T__7);
			setState(175);
			match(LPAREN);
			setState(176);
			createType();
			setState(177);
			match(COMMA);
			setState(178);
			match(IDENTIFIER);
			setState(181);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COMMA) {
				{
				setState(179);
				match(COMMA);
				setState(180);
				position();
				}
			}

			setState(183);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CreateTypeContext extends ParserRuleContext {
		public CreateTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_createType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCreateType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCreateType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCreateType(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CreateTypeContext createType() throws RecognitionException {
		CreateTypeContext _localctx = new CreateTypeContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_createType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(185);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 7680L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UseCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public UseTypeContext useType() {
			return getRuleContext(UseTypeContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public TargetContext target() {
			return getRuleContext(TargetContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public UseCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_useCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterUseCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitUseCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitUseCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UseCommandContext useCommand() throws RecognitionException {
		UseCommandContext _localctx = new UseCommandContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_useCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(187);
			match(T__12);
			setState(188);
			match(LPAREN);
			setState(189);
			useType();
			setState(190);
			match(COMMA);
			setState(191);
			match(IDENTIFIER);
			setState(192);
			match(COMMA);
			setState(193);
			target();
			setState(194);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UseTypeContext extends ParserRuleContext {
		public UseTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_useType; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterUseType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitUseType(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitUseType(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UseTypeContext useType() throws RecognitionException {
		UseTypeContext _localctx = new UseTypeContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_useType);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(196);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 50176L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TargetContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TargetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_target; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterTarget(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitTarget(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitTarget(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TargetContext target() throws RecognitionException {
		TargetContext _localctx = new TargetContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_target);
		try {
			setState(204);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__15:
				enterOuterAlt(_localctx, 1);
				{
				setState(198);
				match(T__15);
				setState(199);
				match(IDENTIFIER);
				}
				break;
			case T__16:
				enterOuterAlt(_localctx, 2);
				{
				setState(200);
				match(T__16);
				setState(201);
				match(IDENTIFIER);
				}
				break;
			case AT:
				enterOuterAlt(_localctx, 3);
				{
				setState(202);
				position();
				}
				break;
			case IDENTIFIER:
				enterOuterAlt(_localctx, 4);
				{
				setState(203);
				match(IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BattleCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<CombatantContext> combatant() {
			return getRuleContexts(CombatantContext.class);
		}
		public CombatantContext combatant(int i) {
			return getRuleContext(CombatantContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(HeroesOfTimeScriptParser.COMMA, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public BattleCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_battleCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterBattleCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitBattleCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitBattleCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BattleCommandContext battleCommand() throws RecognitionException {
		BattleCommandContext _localctx = new BattleCommandContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_battleCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(206);
			match(T__17);
			setState(207);
			match(LPAREN);
			setState(208);
			combatant();
			setState(209);
			match(COMMA);
			setState(210);
			combatant();
			setState(211);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CombatantContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public CombatantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_combatant; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCombatant(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCombatant(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCombatant(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CombatantContext combatant() throws RecognitionException {
		CombatantContext _localctx = new CombatantContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_combatant);
		try {
			setState(218);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
				enterOuterAlt(_localctx, 1);
				{
				setState(213);
				match(T__5);
				setState(214);
				match(IDENTIFIER);
				}
				break;
			case T__8:
				enterOuterAlt(_localctx, 2);
				{
				setState(215);
				match(T__8);
				setState(216);
				match(IDENTIFIER);
				}
				break;
			case IDENTIFIER:
				enterOuterAlt(_localctx, 3);
				{
				setState(217);
				match(IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Hmm3CommandContext extends ParserRuleContext {
		public BuildCommandContext buildCommand() {
			return getRuleContext(BuildCommandContext.class,0);
		}
		public RecruitCommandContext recruitCommand() {
			return getRuleContext(RecruitCommandContext.class,0);
		}
		public CastCommandContext castCommand() {
			return getRuleContext(CastCommandContext.class,0);
		}
		public CollectCommandContext collectCommand() {
			return getRuleContext(CollectCommandContext.class,0);
		}
		public LearnCommandContext learnCommand() {
			return getRuleContext(LearnCommandContext.class,0);
		}
		public LevelUpCommandContext levelUpCommand() {
			return getRuleContext(LevelUpCommandContext.class,0);
		}
		public ExploreCommandContext exploreCommand() {
			return getRuleContext(ExploreCommandContext.class,0);
		}
		public EquipCommandContext equipCommand() {
			return getRuleContext(EquipCommandContext.class,0);
		}
		public SiegeCommandContext siegeCommand() {
			return getRuleContext(SiegeCommandContext.class,0);
		}
		public CaptureCommandContext captureCommand() {
			return getRuleContext(CaptureCommandContext.class,0);
		}
		public Hmm3CommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hmm3Command; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterHmm3Command(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitHmm3Command(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitHmm3Command(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Hmm3CommandContext hmm3Command() throws RecognitionException {
		Hmm3CommandContext _localctx = new Hmm3CommandContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_hmm3Command);
		try {
			setState(230);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__18:
				enterOuterAlt(_localctx, 1);
				{
				setState(220);
				buildCommand();
				}
				break;
			case T__20:
				enterOuterAlt(_localctx, 2);
				{
				setState(221);
				recruitCommand();
				}
				break;
			case T__22:
				enterOuterAlt(_localctx, 3);
				{
				setState(222);
				castCommand();
				}
				break;
			case T__23:
				enterOuterAlt(_localctx, 4);
				{
				setState(223);
				collectCommand();
				}
				break;
			case T__25:
				enterOuterAlt(_localctx, 5);
				{
				setState(224);
				learnCommand();
				}
				break;
			case T__26:
				enterOuterAlt(_localctx, 6);
				{
				setState(225);
				levelUpCommand();
				}
				break;
			case T__28:
				enterOuterAlt(_localctx, 7);
				{
				setState(226);
				exploreCommand();
				}
				break;
			case T__29:
				enterOuterAlt(_localctx, 8);
				{
				setState(227);
				equipCommand();
				}
				break;
			case T__31:
				enterOuterAlt(_localctx, 9);
				{
				setState(228);
				siegeCommand();
				}
				break;
			case T__32:
				enterOuterAlt(_localctx, 10);
				{
				setState(229);
				captureCommand();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BuildCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public BuildCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buildCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterBuildCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitBuildCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitBuildCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BuildCommandContext buildCommand() throws RecognitionException {
		BuildCommandContext _localctx = new BuildCommandContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_buildCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(232);
			match(T__18);
			setState(233);
			match(LPAREN);
			setState(234);
			match(IDENTIFIER);
			setState(235);
			match(COMMA);
			setState(236);
			position();
			setState(237);
			match(COMMA);
			setState(238);
			match(T__19);
			setState(239);
			match(IDENTIFIER);
			setState(240);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RecruitCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode NUMBER() { return getToken(HeroesOfTimeScriptParser.NUMBER, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public RecruitCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recruitCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterRecruitCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitRecruitCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitRecruitCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RecruitCommandContext recruitCommand() throws RecognitionException {
		RecruitCommandContext _localctx = new RecruitCommandContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_recruitCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(242);
			match(T__20);
			setState(243);
			match(LPAREN);
			setState(244);
			match(T__21);
			setState(245);
			match(COMMA);
			setState(246);
			match(IDENTIFIER);
			setState(247);
			match(COMMA);
			setState(248);
			match(NUMBER);
			setState(249);
			match(COMMA);
			setState(250);
			match(T__15);
			setState(251);
			match(IDENTIFIER);
			setState(252);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CastCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public CastCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_castCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCastCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCastCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCastCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CastCommandContext castCommand() throws RecognitionException {
		CastCommandContext _localctx = new CastCommandContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_castCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(254);
			match(T__22);
			setState(255);
			match(LPAREN);
			setState(256);
			match(T__13);
			setState(257);
			match(COMMA);
			setState(258);
			match(IDENTIFIER);
			setState(259);
			match(COMMA);
			setState(260);
			match(T__16);
			setState(261);
			match(IDENTIFIER);
			setState(262);
			match(COMMA);
			setState(263);
			match(T__15);
			setState(264);
			match(IDENTIFIER);
			setState(265);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CollectCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode NUMBER() { return getToken(HeroesOfTimeScriptParser.NUMBER, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public CollectCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_collectCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCollectCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCollectCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCollectCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CollectCommandContext collectCommand() throws RecognitionException {
		CollectCommandContext _localctx = new CollectCommandContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_collectCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(267);
			match(T__23);
			setState(268);
			match(LPAREN);
			setState(269);
			match(T__24);
			setState(270);
			match(COMMA);
			setState(271);
			match(IDENTIFIER);
			setState(272);
			match(COMMA);
			setState(273);
			match(NUMBER);
			setState(274);
			match(COMMA);
			setState(275);
			match(T__19);
			setState(276);
			match(IDENTIFIER);
			setState(277);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LearnCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public LearnCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_learnCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterLearnCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitLearnCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitLearnCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final LearnCommandContext learnCommand() throws RecognitionException {
		LearnCommandContext _localctx = new LearnCommandContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_learnCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(279);
			match(T__25);
			setState(280);
			match(LPAREN);
			setState(281);
			match(T__13);
			setState(282);
			match(COMMA);
			setState(283);
			match(IDENTIFIER);
			setState(284);
			match(COMMA);
			setState(285);
			match(T__15);
			setState(286);
			match(IDENTIFIER);
			setState(287);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LevelUpCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode COMMA() { return getToken(HeroesOfTimeScriptParser.COMMA, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public LevelUpCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_levelUpCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterLevelUpCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitLevelUpCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitLevelUpCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final LevelUpCommandContext levelUpCommand() throws RecognitionException {
		LevelUpCommandContext _localctx = new LevelUpCommandContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_levelUpCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(289);
			match(T__26);
			setState(290);
			match(LPAREN);
			setState(291);
			match(IDENTIFIER);
			setState(292);
			match(COMMA);
			setState(293);
			match(T__27);
			setState(294);
			match(IDENTIFIER);
			setState(295);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExploreCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public ExploreCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exploreCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterExploreCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitExploreCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitExploreCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExploreCommandContext exploreCommand() throws RecognitionException {
		ExploreCommandContext _localctx = new ExploreCommandContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_exploreCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(297);
			match(T__28);
			setState(298);
			match(LPAREN);
			setState(299);
			match(IDENTIFIER);
			setState(300);
			match(COMMA);
			setState(301);
			position();
			setState(302);
			match(COMMA);
			setState(303);
			match(T__15);
			setState(304);
			match(IDENTIFIER);
			setState(305);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EquipCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public EquipCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_equipCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterEquipCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitEquipCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitEquipCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EquipCommandContext equipCommand() throws RecognitionException {
		EquipCommandContext _localctx = new EquipCommandContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_equipCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(307);
			match(T__29);
			setState(308);
			match(LPAREN);
			setState(309);
			match(T__30);
			setState(310);
			match(COMMA);
			setState(311);
			match(IDENTIFIER);
			setState(312);
			match(COMMA);
			setState(313);
			match(T__15);
			setState(314);
			match(IDENTIFIER);
			setState(315);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SiegeCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public SiegeCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_siegeCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterSiegeCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitSiegeCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitSiegeCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SiegeCommandContext siegeCommand() throws RecognitionException {
		SiegeCommandContext _localctx = new SiegeCommandContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_siegeCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(317);
			match(T__31);
			setState(318);
			match(LPAREN);
			setState(319);
			match(IDENTIFIER);
			setState(320);
			match(COMMA);
			setState(321);
			position();
			setState(322);
			match(COMMA);
			setState(323);
			match(T__15);
			setState(324);
			match(IDENTIFIER);
			setState(325);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CaptureCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(HeroesOfTimeScriptParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(HeroesOfTimeScriptParser.IDENTIFIER, i);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public CaptureCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_captureCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterCaptureCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitCaptureCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitCaptureCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CaptureCommandContext captureCommand() throws RecognitionException {
		CaptureCommandContext _localctx = new CaptureCommandContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_captureCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(327);
			match(T__32);
			setState(328);
			match(LPAREN);
			setState(329);
			match(T__33);
			setState(330);
			match(COMMA);
			setState(331);
			match(IDENTIFIER);
			setState(332);
			match(COMMA);
			setState(333);
			match(T__15);
			setState(334);
			match(IDENTIFIER);
			setState(335);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TimelineScriptContext extends ParserRuleContext {
		public TimelineCommandContext timelineCommand() {
			return getRuleContext(TimelineCommandContext.class,0);
		}
		public MergeCommandContext mergeCommand() {
			return getRuleContext(MergeCommandContext.class,0);
		}
		public TimelineScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timelineScript; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterTimelineScript(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitTimelineScript(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitTimelineScript(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TimelineScriptContext timelineScript() throws RecognitionException {
		TimelineScriptContext _localctx = new TimelineScriptContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_timelineScript);
		try {
			setState(339);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__34:
				enterOuterAlt(_localctx, 1);
				{
				setState(337);
				timelineCommand();
				}
				break;
			case T__35:
				enterOuterAlt(_localctx, 2);
				{
				setState(338);
				mergeCommand();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TimelineCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public TimelineContext timeline() {
			return getRuleContext(TimelineContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public TimelineCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timelineCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterTimelineCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitTimelineCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitTimelineCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TimelineCommandContext timelineCommand() throws RecognitionException {
		TimelineCommandContext _localctx = new TimelineCommandContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_timelineCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(341);
			match(T__34);
			setState(342);
			match(LPAREN);
			setState(343);
			timeline();
			setState(344);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MergeCommandContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public List<TimelineContext> timeline() {
			return getRuleContexts(TimelineContext.class);
		}
		public TimelineContext timeline(int i) {
			return getRuleContext(TimelineContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(HeroesOfTimeScriptParser.COMMA, 0); }
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public MergeCommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_mergeCommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterMergeCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitMergeCommand(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitMergeCommand(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MergeCommandContext mergeCommand() throws RecognitionException {
		MergeCommandContext _localctx = new MergeCommandContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_mergeCommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(346);
			match(T__35);
			setState(347);
			match(LPAREN);
			setState(348);
			timeline();
			setState(349);
			match(COMMA);
			setState(350);
			timeline();
			setState(351);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TimelineContext extends ParserRuleContext {
		public TerminalNode TIMELINE_ID() { return getToken(HeroesOfTimeScriptParser.TIMELINE_ID, 0); }
		public TimelineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timeline; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterTimeline(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitTimeline(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitTimeline(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TimelineContext timeline() throws RecognitionException {
		TimelineContext _localctx = new TimelineContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_timeline);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(353);
			match(TIMELINE_ID);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ActionContext extends ParserRuleContext {
		public BasicScriptContext basicScript() {
			return getRuleContext(BasicScriptContext.class,0);
		}
		public ComplexActionContext complexAction() {
			return getRuleContext(ComplexActionContext.class,0);
		}
		public ActionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_action; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterAction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitAction(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitAction(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActionContext action() throws RecognitionException {
		ActionContext _localctx = new ActionContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_action);
		try {
			setState(357);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__5:
			case T__6:
			case T__7:
			case T__12:
			case T__17:
			case T__18:
			case T__20:
			case T__22:
			case T__23:
			case T__25:
			case T__26:
			case T__28:
			case T__29:
			case T__31:
			case T__32:
				enterOuterAlt(_localctx, 1);
				{
				setState(355);
				basicScript();
				}
				break;
			case IDENTIFIER:
				enterOuterAlt(_localctx, 2);
				{
				setState(356);
				complexAction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ComplexActionContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public TerminalNode LPAREN() { return getToken(HeroesOfTimeScriptParser.LPAREN, 0); }
		public ArgumentListContext argumentList() {
			return getRuleContext(ArgumentListContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(HeroesOfTimeScriptParser.RPAREN, 0); }
		public ComplexActionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_complexAction; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterComplexAction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitComplexAction(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitComplexAction(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ComplexActionContext complexAction() throws RecognitionException {
		ComplexActionContext _localctx = new ComplexActionContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_complexAction);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(359);
			match(IDENTIFIER);
			setState(360);
			match(LPAREN);
			setState(361);
			argumentList();
			setState(362);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentListContext extends ParserRuleContext {
		public List<ArgumentContext> argument() {
			return getRuleContexts(ArgumentContext.class);
		}
		public ArgumentContext argument(int i) {
			return getRuleContext(ArgumentContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(HeroesOfTimeScriptParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(HeroesOfTimeScriptParser.COMMA, i);
		}
		public ArgumentListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argumentList; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterArgumentList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitArgumentList(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitArgumentList(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArgumentListContext argumentList() throws RecognitionException {
		ArgumentListContext _localctx = new ArgumentListContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_argumentList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(364);
			argument();
			setState(369);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(365);
				match(COMMA);
				setState(366);
				argument();
				}
				}
				setState(371);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(HeroesOfTimeScriptParser.IDENTIFIER, 0); }
		public TerminalNode NUMBER() { return getToken(HeroesOfTimeScriptParser.NUMBER, 0); }
		public TerminalNode STRING() { return getToken(HeroesOfTimeScriptParser.STRING, 0); }
		public PositionContext position() {
			return getRuleContext(PositionContext.class,0);
		}
		public TargetContext target() {
			return getRuleContext(TargetContext.class,0);
		}
		public ArgumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argument; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterArgument(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitArgument(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitArgument(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArgumentContext argument() throws RecognitionException {
		ArgumentContext _localctx = new ArgumentContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_argument);
		try {
			setState(377);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(372);
				match(IDENTIFIER);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(373);
				match(NUMBER);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(374);
				match(STRING);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(375);
				position();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(376);
				target();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PositionContext extends ParserRuleContext {
		public TerminalNode AT() { return getToken(HeroesOfTimeScriptParser.AT, 0); }
		public List<TerminalNode> NUMBER() { return getTokens(HeroesOfTimeScriptParser.NUMBER); }
		public TerminalNode NUMBER(int i) {
			return getToken(HeroesOfTimeScriptParser.NUMBER, i);
		}
		public TerminalNode COMMA() { return getToken(HeroesOfTimeScriptParser.COMMA, 0); }
		public PositionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_position; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterPosition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitPosition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitPosition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PositionContext position() throws RecognitionException {
		PositionContext _localctx = new PositionContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_position);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(379);
			match(AT);
			setState(380);
			match(NUMBER);
			setState(381);
			match(COMMA);
			setState(382);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DeltaTimeContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(HeroesOfTimeScriptParser.NUMBER, 0); }
		public TerminalNode SIGN() { return getToken(HeroesOfTimeScriptParser.SIGN, 0); }
		public DeltaTimeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_deltaTime; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).enterDeltaTime(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof HeroesOfTimeScriptListener ) ((HeroesOfTimeScriptListener)listener).exitDeltaTime(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof HeroesOfTimeScriptVisitor ) return ((HeroesOfTimeScriptVisitor<? extends T>)visitor).visitDeltaTime(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DeltaTimeContext deltaTime() throws RecognitionException {
		DeltaTimeContext _localctx = new DeltaTimeContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_deltaTime);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(384);
			match(T__36);
			setState(386);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SIGN) {
				{
				setState(385);
				match(SIGN);
				}
			}

			setState(388);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u00018\u0187\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007\u0015"+
		"\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007\u0018"+
		"\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007\u001b"+
		"\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007\u001e"+
		"\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007\"\u0002"+
		"#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007\'\u0001"+
		"\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0003\u0000U\b\u0000\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0003\u0001Z\b\u0001\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0003\u0002`\b\u0002\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0001\u0004\u0003"+
		"\u0004i\b\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0003\u0004w\b\u0004\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0003\u0007\u0089\b\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0003\u0007\u0094\b\u0007\u0001\b\u0004\b\u0097\b\b\u000b\b\f\b"+
		"\u0098\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u00a1\b"+
		"\t\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0001"+
		"\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\f\u0001\f"+
		"\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u00b6\b\f\u0001\f\u0001"+
		"\f\u0001\r\u0001\r\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001"+
		"\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000f\u0001"+
		"\u000f\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001"+
		"\u0010\u0003\u0010\u00cd\b\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0012\u0001\u0012\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0003\u0012\u00db\b\u0012\u0001\u0013\u0001"+
		"\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0013\u0001\u0013\u0001\u0013\u0003\u0013\u00e7\b\u0013\u0001\u0014\u0001"+
		"\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001"+
		"\u0014\u0001\u0014\u0001\u0014\u0001\u0015\u0001\u0015\u0001\u0015\u0001"+
		"\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0001"+
		"\u0015\u0001\u0015\u0001\u0015\u0001\u0016\u0001\u0016\u0001\u0016\u0001"+
		"\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0001"+
		"\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0018\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001"+
		"\u0019\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001"+
		"\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0001\u001d\u0001\u001d\u0001"+
		"\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001"+
		"\u001d\u0001\u001d\u0001\u001e\u0001\u001e\u0003\u001e\u0154\b\u001e\u0001"+
		"\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001\u001f\u0001 \u0001 \u0001"+
		" \u0001 \u0001 \u0001 \u0001 \u0001!\u0001!\u0001\"\u0001\"\u0003\"\u0166"+
		"\b\"\u0001#\u0001#\u0001#\u0001#\u0001#\u0001$\u0001$\u0001$\u0005$\u0170"+
		"\b$\n$\f$\u0173\t$\u0001%\u0001%\u0001%\u0001%\u0001%\u0003%\u017a\b%"+
		"\u0001&\u0001&\u0001&\u0001&\u0001&\u0001\'\u0001\'\u0003\'\u0183\b\'"+
		"\u0001\'\u0001\'\u0001\'\u0000\u0000(\u0000\u0002\u0004\u0006\b\n\f\u000e"+
		"\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDF"+
		"HJLN\u0000\u0002\u0001\u0000\t\f\u0002\u0000\n\n\u000e\u000f\u018a\u0000"+
		"T\u0001\u0000\u0000\u0000\u0002Y\u0001\u0000\u0000\u0000\u0004[\u0001"+
		"\u0000\u0000\u0000\u0006a\u0001\u0000\u0000\u0000\bv\u0001\u0000\u0000"+
		"\u0000\nx\u0001\u0000\u0000\u0000\f{\u0001\u0000\u0000\u0000\u000e\u0093"+
		"\u0001\u0000\u0000\u0000\u0010\u0096\u0001\u0000\u0000\u0000\u0012\u00a0"+
		"\u0001\u0000\u0000\u0000\u0014\u00a2\u0001\u0000\u0000\u0000\u0016\u00a7"+
		"\u0001\u0000\u0000\u0000\u0018\u00ae\u0001\u0000\u0000\u0000\u001a\u00b9"+
		"\u0001\u0000\u0000\u0000\u001c\u00bb\u0001\u0000\u0000\u0000\u001e\u00c4"+
		"\u0001\u0000\u0000\u0000 \u00cc\u0001\u0000\u0000\u0000\"\u00ce\u0001"+
		"\u0000\u0000\u0000$\u00da\u0001\u0000\u0000\u0000&\u00e6\u0001\u0000\u0000"+
		"\u0000(\u00e8\u0001\u0000\u0000\u0000*\u00f2\u0001\u0000\u0000\u0000,"+
		"\u00fe\u0001\u0000\u0000\u0000.\u010b\u0001\u0000\u0000\u00000\u0117\u0001"+
		"\u0000\u0000\u00002\u0121\u0001\u0000\u0000\u00004\u0129\u0001\u0000\u0000"+
		"\u00006\u0133\u0001\u0000\u0000\u00008\u013d\u0001\u0000\u0000\u0000:"+
		"\u0147\u0001\u0000\u0000\u0000<\u0153\u0001\u0000\u0000\u0000>\u0155\u0001"+
		"\u0000\u0000\u0000@\u015a\u0001\u0000\u0000\u0000B\u0161\u0001\u0000\u0000"+
		"\u0000D\u0165\u0001\u0000\u0000\u0000F\u0167\u0001\u0000\u0000\u0000H"+
		"\u016c\u0001\u0000\u0000\u0000J\u0179\u0001\u0000\u0000\u0000L\u017b\u0001"+
		"\u0000\u0000\u0000N\u0180\u0001\u0000\u0000\u0000PU\u0003\u0002\u0001"+
		"\u0000QU\u0003\u0012\t\u0000RU\u0003<\u001e\u0000SU\u0005\u0000\u0000"+
		"\u0001TP\u0001\u0000\u0000\u0000TQ\u0001\u0000\u0000\u0000TR\u0001\u0000"+
		"\u0000\u0000TS\u0001\u0000\u0000\u0000U\u0001\u0001\u0000\u0000\u0000"+
		"VZ\u0003\u0004\u0002\u0000WZ\u0003\n\u0005\u0000XZ\u0003\f\u0006\u0000"+
		"YV\u0001\u0000\u0000\u0000YW\u0001\u0000\u0000\u0000YX\u0001\u0000\u0000"+
		"\u0000Z\u0003\u0001\u0000\u0000\u0000[\\\u0005&\u0000\u0000\\]\u00053"+
		"\u0000\u0000]_\u0003\u0006\u0003\u0000^`\u0003B!\u0000_^\u0001\u0000\u0000"+
		"\u0000_`\u0001\u0000\u0000\u0000`\u0005\u0001\u0000\u0000\u0000ab\u0005"+
		"(\u0000\u0000bc\u00050\u0000\u0000cd\u0003\b\u0004\u0000de\u00051\u0000"+
		"\u0000e\u0007\u0001\u0000\u0000\u0000fh\u0003N\'\u0000gi\u0003L&\u0000"+
		"hg\u0001\u0000\u0000\u0000hi\u0001\u0000\u0000\u0000ij\u0001\u0000\u0000"+
		"\u0000jk\u0005*\u0000\u0000kl\u0003D\"\u0000lw\u0001\u0000\u0000\u0000"+
		"mn\u0003N\'\u0000no\u0005*\u0000\u0000op\u0003D\"\u0000pw\u0001\u0000"+
		"\u0000\u0000qr\u0003L&\u0000rs\u0005*\u0000\u0000st\u0003D\"\u0000tw\u0001"+
		"\u0000\u0000\u0000uw\u0003D\"\u0000vf\u0001\u0000\u0000\u0000vm\u0001"+
		"\u0000\u0000\u0000vq\u0001\u0000\u0000\u0000vu\u0001\u0000\u0000\u0000"+
		"w\t\u0001\u0000\u0000\u0000xy\u0005\'\u0000\u0000yz\u0005&\u0000\u0000"+
		"z\u000b\u0001\u0000\u0000\u0000{|\u0005)\u0000\u0000|}\u00050\u0000\u0000"+
		"}~\u0003\u000e\u0007\u0000~\u007f\u00051\u0000\u0000\u007f\u0080\u0005"+
		"*\u0000\u0000\u0080\u0081\u0005\'\u0000\u0000\u0081\u0082\u0005&\u0000"+
		"\u0000\u0082\r\u0001\u0000\u0000\u0000\u0083\u0084\u0005.\u0000\u0000"+
		"\u0084\u0085\u0005\u0001\u0000\u0000\u0085\u0088\u0003L&\u0000\u0086\u0087"+
		"\u0005\u0002\u0000\u0000\u0087\u0089\u0003N\'\u0000\u0088\u0086\u0001"+
		"\u0000\u0000\u0000\u0088\u0089\u0001\u0000\u0000\u0000\u0089\u0094\u0001"+
		"\u0000\u0000\u0000\u008a\u008b\u0005.\u0000\u0000\u008b\u008c\u0005\u0003"+
		"\u0000\u0000\u008c\u0094\u0003L&\u0000\u008d\u008e\u0005.\u0000\u0000"+
		"\u008e\u0094\u0005\u0004\u0000\u0000\u008f\u0090\u0005.\u0000\u0000\u0090"+
		"\u0091\u0005\u0005\u0000\u0000\u0091\u0094\u0005.\u0000\u0000\u0092\u0094"+
		"\u0003\u0010\b\u0000\u0093\u0083\u0001\u0000\u0000\u0000\u0093\u008a\u0001"+
		"\u0000\u0000\u0000\u0093\u008d\u0001\u0000\u0000\u0000\u0093\u008f\u0001"+
		"\u0000\u0000\u0000\u0093\u0092\u0001\u0000\u0000\u0000\u0094\u000f\u0001"+
		"\u0000\u0000\u0000\u0095\u0097\u0005.\u0000\u0000\u0096\u0095\u0001\u0000"+
		"\u0000\u0000\u0097\u0098\u0001\u0000\u0000\u0000\u0098\u0096\u0001\u0000"+
		"\u0000\u0000\u0098\u0099\u0001\u0000\u0000\u0000\u0099\u0011\u0001\u0000"+
		"\u0000\u0000\u009a\u00a1\u0003\u0014\n\u0000\u009b\u00a1\u0003\u0016\u000b"+
		"\u0000\u009c\u00a1\u0003\u0018\f\u0000\u009d\u00a1\u0003\u001c\u000e\u0000"+
		"\u009e\u00a1\u0003\"\u0011\u0000\u009f\u00a1\u0003&\u0013\u0000\u00a0"+
		"\u009a\u0001\u0000\u0000\u0000\u00a0\u009b\u0001\u0000\u0000\u0000\u00a0"+
		"\u009c\u0001\u0000\u0000\u0000\u00a0\u009d\u0001\u0000\u0000\u0000\u00a0"+
		"\u009e\u0001\u0000\u0000\u0000\u00a0\u009f\u0001\u0000\u0000\u0000\u00a1"+
		"\u0013\u0001\u0000\u0000\u0000\u00a2\u00a3\u0005\u0006\u0000\u0000\u00a3"+
		"\u00a4\u00050\u0000\u0000\u00a4\u00a5\u0005.\u0000\u0000\u00a5\u00a6\u0005"+
		"1\u0000\u0000\u00a6\u0015\u0001\u0000\u0000\u0000\u00a7\u00a8\u0005\u0007"+
		"\u0000\u0000\u00a8\u00a9\u00050\u0000\u0000\u00a9\u00aa\u0005.\u0000\u0000"+
		"\u00aa\u00ab\u00052\u0000\u0000\u00ab\u00ac\u0003L&\u0000\u00ac\u00ad"+
		"\u00051\u0000\u0000\u00ad\u0017\u0001\u0000\u0000\u0000\u00ae\u00af\u0005"+
		"\b\u0000\u0000\u00af\u00b0\u00050\u0000\u0000\u00b0\u00b1\u0003\u001a"+
		"\r\u0000\u00b1\u00b2\u00052\u0000\u0000\u00b2\u00b5\u0005.\u0000\u0000"+
		"\u00b3\u00b4\u00052\u0000\u0000\u00b4\u00b6\u0003L&\u0000\u00b5\u00b3"+
		"\u0001\u0000\u0000\u0000\u00b5\u00b6\u0001\u0000\u0000\u0000\u00b6\u00b7"+
		"\u0001\u0000\u0000\u0000\u00b7\u00b8\u00051\u0000\u0000\u00b8\u0019\u0001"+
		"\u0000\u0000\u0000\u00b9\u00ba\u0007\u0000\u0000\u0000\u00ba\u001b\u0001"+
		"\u0000\u0000\u0000\u00bb\u00bc\u0005\r\u0000\u0000\u00bc\u00bd\u00050"+
		"\u0000\u0000\u00bd\u00be\u0003\u001e\u000f\u0000\u00be\u00bf\u00052\u0000"+
		"\u0000\u00bf\u00c0\u0005.\u0000\u0000\u00c0\u00c1\u00052\u0000\u0000\u00c1"+
		"\u00c2\u0003 \u0010\u0000\u00c2\u00c3\u00051\u0000\u0000\u00c3\u001d\u0001"+
		"\u0000\u0000\u0000\u00c4\u00c5\u0007\u0001\u0000\u0000\u00c5\u001f\u0001"+
		"\u0000\u0000\u0000\u00c6\u00c7\u0005\u0010\u0000\u0000\u00c7\u00cd\u0005"+
		".\u0000\u0000\u00c8\u00c9\u0005\u0011\u0000\u0000\u00c9\u00cd\u0005.\u0000"+
		"\u0000\u00ca\u00cd\u0003L&\u0000\u00cb\u00cd\u0005.\u0000\u0000\u00cc"+
		"\u00c6\u0001\u0000\u0000\u0000\u00cc\u00c8\u0001\u0000\u0000\u0000\u00cc"+
		"\u00ca\u0001\u0000\u0000\u0000\u00cc\u00cb\u0001\u0000\u0000\u0000\u00cd"+
		"!\u0001\u0000\u0000\u0000\u00ce\u00cf\u0005\u0012\u0000\u0000\u00cf\u00d0"+
		"\u00050\u0000\u0000\u00d0\u00d1\u0003$\u0012\u0000\u00d1\u00d2\u00052"+
		"\u0000\u0000\u00d2\u00d3\u0003$\u0012\u0000\u00d3\u00d4\u00051\u0000\u0000"+
		"\u00d4#\u0001\u0000\u0000\u0000\u00d5\u00d6\u0005\u0006\u0000\u0000\u00d6"+
		"\u00db\u0005.\u0000\u0000\u00d7\u00d8\u0005\t\u0000\u0000\u00d8\u00db"+
		"\u0005.\u0000\u0000\u00d9\u00db\u0005.\u0000\u0000\u00da\u00d5\u0001\u0000"+
		"\u0000\u0000\u00da\u00d7\u0001\u0000\u0000\u0000\u00da\u00d9\u0001\u0000"+
		"\u0000\u0000\u00db%\u0001\u0000\u0000\u0000\u00dc\u00e7\u0003(\u0014\u0000"+
		"\u00dd\u00e7\u0003*\u0015\u0000\u00de\u00e7\u0003,\u0016\u0000\u00df\u00e7"+
		"\u0003.\u0017\u0000\u00e0\u00e7\u00030\u0018\u0000\u00e1\u00e7\u00032"+
		"\u0019\u0000\u00e2\u00e7\u00034\u001a\u0000\u00e3\u00e7\u00036\u001b\u0000"+
		"\u00e4\u00e7\u00038\u001c\u0000\u00e5\u00e7\u0003:\u001d\u0000\u00e6\u00dc"+
		"\u0001\u0000\u0000\u0000\u00e6\u00dd\u0001\u0000\u0000\u0000\u00e6\u00de"+
		"\u0001\u0000\u0000\u0000\u00e6\u00df\u0001\u0000\u0000\u0000\u00e6\u00e0"+
		"\u0001\u0000\u0000\u0000\u00e6\u00e1\u0001\u0000\u0000\u0000\u00e6\u00e2"+
		"\u0001\u0000\u0000\u0000\u00e6\u00e3\u0001\u0000\u0000\u0000\u00e6\u00e4"+
		"\u0001\u0000\u0000\u0000\u00e6\u00e5\u0001\u0000\u0000\u0000\u00e7\'\u0001"+
		"\u0000\u0000\u0000\u00e8\u00e9\u0005\u0013\u0000\u0000\u00e9\u00ea\u0005"+
		"0\u0000\u0000\u00ea\u00eb\u0005.\u0000\u0000\u00eb\u00ec\u00052\u0000"+
		"\u0000\u00ec\u00ed\u0003L&\u0000\u00ed\u00ee\u00052\u0000\u0000\u00ee"+
		"\u00ef\u0005\u0014\u0000\u0000\u00ef\u00f0\u0005.\u0000\u0000\u00f0\u00f1"+
		"\u00051\u0000\u0000\u00f1)\u0001\u0000\u0000\u0000\u00f2\u00f3\u0005\u0015"+
		"\u0000\u0000\u00f3\u00f4\u00050\u0000\u0000\u00f4\u00f5\u0005\u0016\u0000"+
		"\u0000\u00f5\u00f6\u00052\u0000\u0000\u00f6\u00f7\u0005.\u0000\u0000\u00f7"+
		"\u00f8\u00052\u0000\u0000\u00f8\u00f9\u0005-\u0000\u0000\u00f9\u00fa\u0005"+
		"2\u0000\u0000\u00fa\u00fb\u0005\u0010\u0000\u0000\u00fb\u00fc\u0005.\u0000"+
		"\u0000\u00fc\u00fd\u00051\u0000\u0000\u00fd+\u0001\u0000\u0000\u0000\u00fe"+
		"\u00ff\u0005\u0017\u0000\u0000\u00ff\u0100\u00050\u0000\u0000\u0100\u0101"+
		"\u0005\u000e\u0000\u0000\u0101\u0102\u00052\u0000\u0000\u0102\u0103\u0005"+
		".\u0000\u0000\u0103\u0104\u00052\u0000\u0000\u0104\u0105\u0005\u0011\u0000"+
		"\u0000\u0105\u0106\u0005.\u0000\u0000\u0106\u0107\u00052\u0000\u0000\u0107"+
		"\u0108\u0005\u0010\u0000\u0000\u0108\u0109\u0005.\u0000\u0000\u0109\u010a"+
		"\u00051\u0000\u0000\u010a-\u0001\u0000\u0000\u0000\u010b\u010c\u0005\u0018"+
		"\u0000\u0000\u010c\u010d\u00050\u0000\u0000\u010d\u010e\u0005\u0019\u0000"+
		"\u0000\u010e\u010f\u00052\u0000\u0000\u010f\u0110\u0005.\u0000\u0000\u0110"+
		"\u0111\u00052\u0000\u0000\u0111\u0112\u0005-\u0000\u0000\u0112\u0113\u0005"+
		"2\u0000\u0000\u0113\u0114\u0005\u0014\u0000\u0000\u0114\u0115\u0005.\u0000"+
		"\u0000\u0115\u0116\u00051\u0000\u0000\u0116/\u0001\u0000\u0000\u0000\u0117"+
		"\u0118\u0005\u001a\u0000\u0000\u0118\u0119\u00050\u0000\u0000\u0119\u011a"+
		"\u0005\u000e\u0000\u0000\u011a\u011b\u00052\u0000\u0000\u011b\u011c\u0005"+
		".\u0000\u0000\u011c\u011d\u00052\u0000\u0000\u011d\u011e\u0005\u0010\u0000"+
		"\u0000\u011e\u011f\u0005.\u0000\u0000\u011f\u0120\u00051\u0000\u0000\u0120"+
		"1\u0001\u0000\u0000\u0000\u0121\u0122\u0005\u001b\u0000\u0000\u0122\u0123"+
		"\u00050\u0000\u0000\u0123\u0124\u0005.\u0000\u0000\u0124\u0125\u00052"+
		"\u0000\u0000\u0125\u0126\u0005\u001c\u0000\u0000\u0126\u0127\u0005.\u0000"+
		"\u0000\u0127\u0128\u00051\u0000\u0000\u01283\u0001\u0000\u0000\u0000\u0129"+
		"\u012a\u0005\u001d\u0000\u0000\u012a\u012b\u00050\u0000\u0000\u012b\u012c"+
		"\u0005.\u0000\u0000\u012c\u012d\u00052\u0000\u0000\u012d\u012e\u0003L"+
		"&\u0000\u012e\u012f\u00052\u0000\u0000\u012f\u0130\u0005\u0010\u0000\u0000"+
		"\u0130\u0131\u0005.\u0000\u0000\u0131\u0132\u00051\u0000\u0000\u01325"+
		"\u0001\u0000\u0000\u0000\u0133\u0134\u0005\u001e\u0000\u0000\u0134\u0135"+
		"\u00050\u0000\u0000\u0135\u0136\u0005\u001f\u0000\u0000\u0136\u0137\u0005"+
		"2\u0000\u0000\u0137\u0138\u0005.\u0000\u0000\u0138\u0139\u00052\u0000"+
		"\u0000\u0139\u013a\u0005\u0010\u0000\u0000\u013a\u013b\u0005.\u0000\u0000"+
		"\u013b\u013c\u00051\u0000\u0000\u013c7\u0001\u0000\u0000\u0000\u013d\u013e"+
		"\u0005 \u0000\u0000\u013e\u013f\u00050\u0000\u0000\u013f\u0140\u0005."+
		"\u0000\u0000\u0140\u0141\u00052\u0000\u0000\u0141\u0142\u0003L&\u0000"+
		"\u0142\u0143\u00052\u0000\u0000\u0143\u0144\u0005\u0010\u0000\u0000\u0144"+
		"\u0145\u0005.\u0000\u0000\u0145\u0146\u00051\u0000\u0000\u01469\u0001"+
		"\u0000\u0000\u0000\u0147\u0148\u0005!\u0000\u0000\u0148\u0149\u00050\u0000"+
		"\u0000\u0149\u014a\u0005\"\u0000\u0000\u014a\u014b\u00052\u0000\u0000"+
		"\u014b\u014c\u0005.\u0000\u0000\u014c\u014d\u00052\u0000\u0000\u014d\u014e"+
		"\u0005\u0010\u0000\u0000\u014e\u014f\u0005.\u0000\u0000\u014f\u0150\u0005"+
		"1\u0000\u0000\u0150;\u0001\u0000\u0000\u0000\u0151\u0154\u0003>\u001f"+
		"\u0000\u0152\u0154\u0003@ \u0000\u0153\u0151\u0001\u0000\u0000\u0000\u0153"+
		"\u0152\u0001\u0000\u0000\u0000\u0154=\u0001\u0000\u0000\u0000\u0155\u0156"+
		"\u0005#\u0000\u0000\u0156\u0157\u00050\u0000\u0000\u0157\u0158\u0003B"+
		"!\u0000\u0158\u0159\u00051\u0000\u0000\u0159?\u0001\u0000\u0000\u0000"+
		"\u015a\u015b\u0005$\u0000\u0000\u015b\u015c\u00050\u0000\u0000\u015c\u015d"+
		"\u0003B!\u0000\u015d\u015e\u00052\u0000\u0000\u015e\u015f\u0003B!\u0000"+
		"\u015f\u0160\u00051\u0000\u0000\u0160A\u0001\u0000\u0000\u0000\u0161\u0162"+
		"\u0005+\u0000\u0000\u0162C\u0001\u0000\u0000\u0000\u0163\u0166\u0003\u0012"+
		"\t\u0000\u0164\u0166\u0003F#\u0000\u0165\u0163\u0001\u0000\u0000\u0000"+
		"\u0165\u0164\u0001\u0000\u0000\u0000\u0166E\u0001\u0000\u0000\u0000\u0167"+
		"\u0168\u0005.\u0000\u0000\u0168\u0169\u00050\u0000\u0000\u0169\u016a\u0003"+
		"H$\u0000\u016a\u016b\u00051\u0000\u0000\u016bG\u0001\u0000\u0000\u0000"+
		"\u016c\u0171\u0003J%\u0000\u016d\u016e\u00052\u0000\u0000\u016e\u0170"+
		"\u0003J%\u0000\u016f\u016d\u0001\u0000\u0000\u0000\u0170\u0173\u0001\u0000"+
		"\u0000\u0000\u0171\u016f\u0001\u0000\u0000\u0000\u0171\u0172\u0001\u0000"+
		"\u0000\u0000\u0172I\u0001\u0000\u0000\u0000\u0173\u0171\u0001\u0000\u0000"+
		"\u0000\u0174\u017a\u0005.\u0000\u0000\u0175\u017a\u0005-\u0000\u0000\u0176"+
		"\u017a\u0005/\u0000\u0000\u0177\u017a\u0003L&\u0000\u0178\u017a\u0003"+
		" \u0010\u0000\u0179\u0174\u0001\u0000\u0000\u0000\u0179\u0175\u0001\u0000"+
		"\u0000\u0000\u0179\u0176\u0001\u0000\u0000\u0000\u0179\u0177\u0001\u0000"+
		"\u0000\u0000\u0179\u0178\u0001\u0000\u0000\u0000\u017aK\u0001\u0000\u0000"+
		"\u0000\u017b\u017c\u00054\u0000\u0000\u017c\u017d\u0005-\u0000\u0000\u017d"+
		"\u017e\u00052\u0000\u0000\u017e\u017f\u0005-\u0000\u0000\u017fM\u0001"+
		"\u0000\u0000\u0000\u0180\u0182\u0005%\u0000\u0000\u0181\u0183\u0005,\u0000"+
		"\u0000\u0182\u0181\u0001\u0000\u0000\u0000\u0182\u0183\u0001\u0000\u0000"+
		"\u0000\u0183\u0184\u0001\u0000\u0000\u0000\u0184\u0185\u0005-\u0000\u0000"+
		"\u0185O\u0001\u0000\u0000\u0000\u0012TY_hv\u0088\u0093\u0098\u00a0\u00b5"+
		"\u00cc\u00da\u00e6\u0153\u0165\u0171\u0179\u0182";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}