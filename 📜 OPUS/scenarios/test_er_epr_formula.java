// 🧪 TEST : Implémentation ER=EPR dans MagicFormulaEngine

@Test
public void testVinceVegaEREqualsEPR() {
    // Configuration
    GameContext gameContext = new GameContext();
    Hero vince = new Hero("hero_vince_vega");
    Artifact gun = new Artifact("power_wormhole_vince_vega_gun");
    
    // Créer deux mondes
    World worldAlpha = new World("world_alpha_instance");
    World worldBeta = new World("world_beta_instance");
    
    // Placer Vince et sa cible
    vince.setPosition(new Position(5, 5));
    vince.equip(gun);
    worldAlpha.addHero(vince);
    
    Hero target = new Hero("hero_marcus");
    target.setPosition(new Position(7, 7));
    target.setInFogOfWar(true);
    worldBeta.addHero(target);
    
    // Exécuter la formule ER=EPR
    String formula = "ψVV01: ⊙(VINCE_STYLE_SHOT @target_reality ⟶ OPEN_WORMHOLE(pulp_fiction_cool))";
    
    FormulaResult result = magicFormulaEngine.executeFormula(formula, gameContext);
    
    // Vérifications
    assertTrue("Wormhole créé", result.hasEffect("wormhole_created"));
    assertTrue("Intrication établie", result.hasEffect("entanglement_active"));
    assertEquals("Target touché malgré fog", "hit", result.getTargetStatus());
    
    // Vérifier le principe ER=EPR
    WormholeBridge bridge = result.getWormhole();
    EntangledPair pair = result.getEntanglement();
    
    assertEquals("ER equals EPR", bridge.getId(), pair.getCorrelationId());
    
    System.out.println("✅ Principe ER=EPR validé !");
}
