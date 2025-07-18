// Generated from com/heroesoftimepoc/temporalengine/parser/HeroesOfTimeScript.g4 by ANTLR 4.13.1
package com.heroesoftimepoc.temporalengine.parser;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link HeroesOfTimeScriptParser}.
 */
public interface HeroesOfTimeScriptListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#script}.
	 * @param ctx the parse tree
	 */
	void enterScript(HeroesOfTimeScriptParser.ScriptContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#script}.
	 * @param ctx the parse tree
	 */
	void exitScript(HeroesOfTimeScriptParser.ScriptContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#temporalScript}.
	 * @param ctx the parse tree
	 */
	void enterTemporalScript(HeroesOfTimeScriptParser.TemporalScriptContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#temporalScript}.
	 * @param ctx the parse tree
	 */
	void exitTemporalScript(HeroesOfTimeScriptParser.TemporalScriptContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#psiState}.
	 * @param ctx the parse tree
	 */
	void enterPsiState(HeroesOfTimeScriptParser.PsiStateContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#psiState}.
	 * @param ctx the parse tree
	 */
	void exitPsiState(HeroesOfTimeScriptParser.PsiStateContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#observation}.
	 * @param ctx the parse tree
	 */
	void enterObservation(HeroesOfTimeScriptParser.ObservationContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#observation}.
	 * @param ctx the parse tree
	 */
	void exitObservation(HeroesOfTimeScriptParser.ObservationContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#temporalExpression}.
	 * @param ctx the parse tree
	 */
	void enterTemporalExpression(HeroesOfTimeScriptParser.TemporalExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#temporalExpression}.
	 * @param ctx the parse tree
	 */
	void exitTemporalExpression(HeroesOfTimeScriptParser.TemporalExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#collapseCommand}.
	 * @param ctx the parse tree
	 */
	void enterCollapseCommand(HeroesOfTimeScriptParser.CollapseCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#collapseCommand}.
	 * @param ctx the parse tree
	 */
	void exitCollapseCommand(HeroesOfTimeScriptParser.CollapseCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#observationTrigger}.
	 * @param ctx the parse tree
	 */
	void enterObservationTrigger(HeroesOfTimeScriptParser.ObservationTriggerContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#observationTrigger}.
	 * @param ctx the parse tree
	 */
	void exitObservationTrigger(HeroesOfTimeScriptParser.ObservationTriggerContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#condition}.
	 * @param ctx the parse tree
	 */
	void enterCondition(HeroesOfTimeScriptParser.ConditionContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#condition}.
	 * @param ctx the parse tree
	 */
	void exitCondition(HeroesOfTimeScriptParser.ConditionContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#customCondition}.
	 * @param ctx the parse tree
	 */
	void enterCustomCondition(HeroesOfTimeScriptParser.CustomConditionContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#customCondition}.
	 * @param ctx the parse tree
	 */
	void exitCustomCondition(HeroesOfTimeScriptParser.CustomConditionContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#basicScript}.
	 * @param ctx the parse tree
	 */
	void enterBasicScript(HeroesOfTimeScriptParser.BasicScriptContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#basicScript}.
	 * @param ctx the parse tree
	 */
	void exitBasicScript(HeroesOfTimeScriptParser.BasicScriptContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#heroCommand}.
	 * @param ctx the parse tree
	 */
	void enterHeroCommand(HeroesOfTimeScriptParser.HeroCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#heroCommand}.
	 * @param ctx the parse tree
	 */
	void exitHeroCommand(HeroesOfTimeScriptParser.HeroCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#movementCommand}.
	 * @param ctx the parse tree
	 */
	void enterMovementCommand(HeroesOfTimeScriptParser.MovementCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#movementCommand}.
	 * @param ctx the parse tree
	 */
	void exitMovementCommand(HeroesOfTimeScriptParser.MovementCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#createCommand}.
	 * @param ctx the parse tree
	 */
	void enterCreateCommand(HeroesOfTimeScriptParser.CreateCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#createCommand}.
	 * @param ctx the parse tree
	 */
	void exitCreateCommand(HeroesOfTimeScriptParser.CreateCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#createType}.
	 * @param ctx the parse tree
	 */
	void enterCreateType(HeroesOfTimeScriptParser.CreateTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#createType}.
	 * @param ctx the parse tree
	 */
	void exitCreateType(HeroesOfTimeScriptParser.CreateTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#useCommand}.
	 * @param ctx the parse tree
	 */
	void enterUseCommand(HeroesOfTimeScriptParser.UseCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#useCommand}.
	 * @param ctx the parse tree
	 */
	void exitUseCommand(HeroesOfTimeScriptParser.UseCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#useType}.
	 * @param ctx the parse tree
	 */
	void enterUseType(HeroesOfTimeScriptParser.UseTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#useType}.
	 * @param ctx the parse tree
	 */
	void exitUseType(HeroesOfTimeScriptParser.UseTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#target}.
	 * @param ctx the parse tree
	 */
	void enterTarget(HeroesOfTimeScriptParser.TargetContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#target}.
	 * @param ctx the parse tree
	 */
	void exitTarget(HeroesOfTimeScriptParser.TargetContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#battleCommand}.
	 * @param ctx the parse tree
	 */
	void enterBattleCommand(HeroesOfTimeScriptParser.BattleCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#battleCommand}.
	 * @param ctx the parse tree
	 */
	void exitBattleCommand(HeroesOfTimeScriptParser.BattleCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#combatant}.
	 * @param ctx the parse tree
	 */
	void enterCombatant(HeroesOfTimeScriptParser.CombatantContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#combatant}.
	 * @param ctx the parse tree
	 */
	void exitCombatant(HeroesOfTimeScriptParser.CombatantContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#hmm3Command}.
	 * @param ctx the parse tree
	 */
	void enterHmm3Command(HeroesOfTimeScriptParser.Hmm3CommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#hmm3Command}.
	 * @param ctx the parse tree
	 */
	void exitHmm3Command(HeroesOfTimeScriptParser.Hmm3CommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#buildCommand}.
	 * @param ctx the parse tree
	 */
	void enterBuildCommand(HeroesOfTimeScriptParser.BuildCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#buildCommand}.
	 * @param ctx the parse tree
	 */
	void exitBuildCommand(HeroesOfTimeScriptParser.BuildCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#recruitCommand}.
	 * @param ctx the parse tree
	 */
	void enterRecruitCommand(HeroesOfTimeScriptParser.RecruitCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#recruitCommand}.
	 * @param ctx the parse tree
	 */
	void exitRecruitCommand(HeroesOfTimeScriptParser.RecruitCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#castCommand}.
	 * @param ctx the parse tree
	 */
	void enterCastCommand(HeroesOfTimeScriptParser.CastCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#castCommand}.
	 * @param ctx the parse tree
	 */
	void exitCastCommand(HeroesOfTimeScriptParser.CastCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#collectCommand}.
	 * @param ctx the parse tree
	 */
	void enterCollectCommand(HeroesOfTimeScriptParser.CollectCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#collectCommand}.
	 * @param ctx the parse tree
	 */
	void exitCollectCommand(HeroesOfTimeScriptParser.CollectCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#learnCommand}.
	 * @param ctx the parse tree
	 */
	void enterLearnCommand(HeroesOfTimeScriptParser.LearnCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#learnCommand}.
	 * @param ctx the parse tree
	 */
	void exitLearnCommand(HeroesOfTimeScriptParser.LearnCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#levelUpCommand}.
	 * @param ctx the parse tree
	 */
	void enterLevelUpCommand(HeroesOfTimeScriptParser.LevelUpCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#levelUpCommand}.
	 * @param ctx the parse tree
	 */
	void exitLevelUpCommand(HeroesOfTimeScriptParser.LevelUpCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#exploreCommand}.
	 * @param ctx the parse tree
	 */
	void enterExploreCommand(HeroesOfTimeScriptParser.ExploreCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#exploreCommand}.
	 * @param ctx the parse tree
	 */
	void exitExploreCommand(HeroesOfTimeScriptParser.ExploreCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#equipCommand}.
	 * @param ctx the parse tree
	 */
	void enterEquipCommand(HeroesOfTimeScriptParser.EquipCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#equipCommand}.
	 * @param ctx the parse tree
	 */
	void exitEquipCommand(HeroesOfTimeScriptParser.EquipCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#siegeCommand}.
	 * @param ctx the parse tree
	 */
	void enterSiegeCommand(HeroesOfTimeScriptParser.SiegeCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#siegeCommand}.
	 * @param ctx the parse tree
	 */
	void exitSiegeCommand(HeroesOfTimeScriptParser.SiegeCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#captureCommand}.
	 * @param ctx the parse tree
	 */
	void enterCaptureCommand(HeroesOfTimeScriptParser.CaptureCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#captureCommand}.
	 * @param ctx the parse tree
	 */
	void exitCaptureCommand(HeroesOfTimeScriptParser.CaptureCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#timelineScript}.
	 * @param ctx the parse tree
	 */
	void enterTimelineScript(HeroesOfTimeScriptParser.TimelineScriptContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#timelineScript}.
	 * @param ctx the parse tree
	 */
	void exitTimelineScript(HeroesOfTimeScriptParser.TimelineScriptContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#timelineCommand}.
	 * @param ctx the parse tree
	 */
	void enterTimelineCommand(HeroesOfTimeScriptParser.TimelineCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#timelineCommand}.
	 * @param ctx the parse tree
	 */
	void exitTimelineCommand(HeroesOfTimeScriptParser.TimelineCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#mergeCommand}.
	 * @param ctx the parse tree
	 */
	void enterMergeCommand(HeroesOfTimeScriptParser.MergeCommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#mergeCommand}.
	 * @param ctx the parse tree
	 */
	void exitMergeCommand(HeroesOfTimeScriptParser.MergeCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#timeline}.
	 * @param ctx the parse tree
	 */
	void enterTimeline(HeroesOfTimeScriptParser.TimelineContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#timeline}.
	 * @param ctx the parse tree
	 */
	void exitTimeline(HeroesOfTimeScriptParser.TimelineContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#action}.
	 * @param ctx the parse tree
	 */
	void enterAction(HeroesOfTimeScriptParser.ActionContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#action}.
	 * @param ctx the parse tree
	 */
	void exitAction(HeroesOfTimeScriptParser.ActionContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#complexAction}.
	 * @param ctx the parse tree
	 */
	void enterComplexAction(HeroesOfTimeScriptParser.ComplexActionContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#complexAction}.
	 * @param ctx the parse tree
	 */
	void exitComplexAction(HeroesOfTimeScriptParser.ComplexActionContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void enterArgumentList(HeroesOfTimeScriptParser.ArgumentListContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void exitArgumentList(HeroesOfTimeScriptParser.ArgumentListContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(HeroesOfTimeScriptParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(HeroesOfTimeScriptParser.ArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#position}.
	 * @param ctx the parse tree
	 */
	void enterPosition(HeroesOfTimeScriptParser.PositionContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#position}.
	 * @param ctx the parse tree
	 */
	void exitPosition(HeroesOfTimeScriptParser.PositionContext ctx);
	/**
	 * Enter a parse tree produced by {@link HeroesOfTimeScriptParser#deltaTime}.
	 * @param ctx the parse tree
	 */
	void enterDeltaTime(HeroesOfTimeScriptParser.DeltaTimeContext ctx);
	/**
	 * Exit a parse tree produced by {@link HeroesOfTimeScriptParser#deltaTime}.
	 * @param ctx the parse tree
	 */
	void exitDeltaTime(HeroesOfTimeScriptParser.DeltaTimeContext ctx);
}