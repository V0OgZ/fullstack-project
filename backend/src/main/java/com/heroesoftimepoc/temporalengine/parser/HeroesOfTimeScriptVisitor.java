// Generated from com/heroesoftimepoc/temporalengine/parser/HeroesOfTimeScript.g4 by ANTLR 4.13.1
package com.heroesoftimepoc.temporalengine.parser;
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link HeroesOfTimeScriptParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface HeroesOfTimeScriptVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#script}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitScript(HeroesOfTimeScriptParser.ScriptContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#temporalScript}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTemporalScript(HeroesOfTimeScriptParser.TemporalScriptContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#psiState}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPsiState(HeroesOfTimeScriptParser.PsiStateContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#observation}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObservation(HeroesOfTimeScriptParser.ObservationContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#temporalExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTemporalExpression(HeroesOfTimeScriptParser.TemporalExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#collapseCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCollapseCommand(HeroesOfTimeScriptParser.CollapseCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#observationTrigger}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObservationTrigger(HeroesOfTimeScriptParser.ObservationTriggerContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#condition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCondition(HeroesOfTimeScriptParser.ConditionContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#customCondition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCustomCondition(HeroesOfTimeScriptParser.CustomConditionContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#basicScript}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBasicScript(HeroesOfTimeScriptParser.BasicScriptContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#heroCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitHeroCommand(HeroesOfTimeScriptParser.HeroCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#movementCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMovementCommand(HeroesOfTimeScriptParser.MovementCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#createCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCreateCommand(HeroesOfTimeScriptParser.CreateCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#createType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCreateType(HeroesOfTimeScriptParser.CreateTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#useCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUseCommand(HeroesOfTimeScriptParser.UseCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#useType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUseType(HeroesOfTimeScriptParser.UseTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#target}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTarget(HeroesOfTimeScriptParser.TargetContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#battleCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBattleCommand(HeroesOfTimeScriptParser.BattleCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#combatant}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCombatant(HeroesOfTimeScriptParser.CombatantContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#hmm3Command}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitHmm3Command(HeroesOfTimeScriptParser.Hmm3CommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#buildCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBuildCommand(HeroesOfTimeScriptParser.BuildCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#recruitCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRecruitCommand(HeroesOfTimeScriptParser.RecruitCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#castCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCastCommand(HeroesOfTimeScriptParser.CastCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#collectCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCollectCommand(HeroesOfTimeScriptParser.CollectCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#learnCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLearnCommand(HeroesOfTimeScriptParser.LearnCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#levelUpCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLevelUpCommand(HeroesOfTimeScriptParser.LevelUpCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#exploreCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExploreCommand(HeroesOfTimeScriptParser.ExploreCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#equipCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEquipCommand(HeroesOfTimeScriptParser.EquipCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#siegeCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSiegeCommand(HeroesOfTimeScriptParser.SiegeCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#captureCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCaptureCommand(HeroesOfTimeScriptParser.CaptureCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#timelineScript}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTimelineScript(HeroesOfTimeScriptParser.TimelineScriptContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#timelineCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTimelineCommand(HeroesOfTimeScriptParser.TimelineCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#mergeCommand}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMergeCommand(HeroesOfTimeScriptParser.MergeCommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#timeline}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTimeline(HeroesOfTimeScriptParser.TimelineContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#action}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAction(HeroesOfTimeScriptParser.ActionContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#complexAction}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitComplexAction(HeroesOfTimeScriptParser.ComplexActionContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#argumentList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgumentList(HeroesOfTimeScriptParser.ArgumentListContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#argument}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgument(HeroesOfTimeScriptParser.ArgumentContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#position}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPosition(HeroesOfTimeScriptParser.PositionContext ctx);
	/**
	 * Visit a parse tree produced by {@link HeroesOfTimeScriptParser#deltaTime}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeltaTime(HeroesOfTimeScriptParser.DeltaTimeContext ctx);
}