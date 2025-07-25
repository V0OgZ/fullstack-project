#!/usr/bin/env python3
"""
🗡️⚡ TEST EXCALIBUR RÉFÉRENCES COMPLET
Test du système de références intelligentes d'Excalibur

@author: Jean-Grofignon (Canapé Cosmique)
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BACKEND_URL = "http://localhost:8080"
TEST_GAME_ID = "excalibur_test_game"
TEST_HERO_ID = "arthur_excalibur_fusion"

def print_header(title):
    """Affiche un header stylé"""
    print(f"\n{'='*60}")
    print(f"🗡️⚡ {title}")
    print(f"{'='*60}")

def print_test_result(test_name, success, details=""):
    """Affiche le résultat d'un test"""
    status = "✅ SUCCÈS" if success else "❌ ÉCHEC"
    print(f"{status} - {test_name}")
    if details:
        print(f"   📋 {details}")

def test_backend_connection():
    """Test la connexion au backend"""
    print_header("TEST CONNEXION BACKEND")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/health", timeout=5)
        success = response.status_code == 200
        print_test_result("Connexion Backend", success, f"Status: {response.status_code}")
        return success
    except Exception as e:
        print_test_result("Connexion Backend", False, f"Erreur: {e}")
        return False

def test_spell_reference_resolver():
    """Test le SpellReferenceResolver"""
    print_header("TEST SPELL REFERENCE RESOLVER")
    
    # Test des sorts hérités connus
    inherited_spells = [
        {"name": "METEOR_SHOWER", "source": "magic_guild"},
        {"name": "DIVINE_INTERVENTION", "source": "arthur_base"},
        {"name": "HOLY_STRIKE", "source": "excalibur_base"},
        {"name": "DIMENSIONAL_RIFT", "source": "portal_lachin"},
        {"name": "TIME_REWIND", "source": "tatouages_memento"}
    ]
    
    success_count = 0
    
    for spell in inherited_spells:
        try:
            # Test via l'endpoint de résolution (à créer)
            response = requests.post(f"{BACKEND_URL}/api/magic-formulas/resolve-reference", 
                                   json={
                                       "spellName": spell["name"], 
                                       "sourceArtifact": spell["source"]
                                   }, timeout=5)
            
            if response.status_code == 200:
                result = response.json()
                success = result.get("resolved", False)
                print_test_result(f"Résolution {spell['name']}", success, 
                                f"Source: {spell['source']}")
                if success:
                    success_count += 1
            else:
                print_test_result(f"Résolution {spell['name']}", False, 
                                f"HTTP {response.status_code}")
                
        except Exception as e:
            print_test_result(f"Résolution {spell['name']}", False, f"Erreur: {e}")
    
    print(f"\n📊 Résultats: {success_count}/{len(inherited_spells)} sorts résolus")
    return success_count == len(inherited_spells)

def test_excalibur_unique_spells():
    """Test les sorts uniques d'Excalibur"""
    print_header("TEST SORTS UNIQUES EXCALIBUR")
    
    unique_spells = [
        {"id": "ψ001", "name": "POWER_SLASH_QUANTUM"},
        {"id": "ψ002", "name": "TEMPORAL_BLADE_STORM"},
        {"id": "ψ003", "name": "REALITY_SEVERANCE"},
        {"id": "ψ004", "name": "CANAPÉ_DIVINE_STRIKE"}
    ]
    
    success_count = 0
    
    for spell in unique_spells:
        try:
            # Test d'exécution des sorts uniques
            response = requests.post(f"{BACKEND_URL}/api/magic-formulas/execute-excalibur", 
                                   json={
                                       "spellId": spell["id"], 
                                       "heroId": TEST_HERO_ID,
                                       "gameId": TEST_GAME_ID
                                   }, timeout=5)
            
            if response.status_code == 200:
                result = response.json()
                success = result.get("success", False)
                damage = result.get("damage", 0)
                print_test_result(f"Exécution {spell['name']}", success, 
                                f"Dégâts: {damage}")
                if success:
                    success_count += 1
            else:
                print_test_result(f"Exécution {spell['name']}", False, 
                                f"HTTP {response.status_code}")
                
        except Exception as e:
            print_test_result(f"Exécution {spell['name']}", False, f"Erreur: {e}")
    
    print(f"\n📊 Résultats: {success_count}/{len(unique_spells)} sorts exécutés")
    return success_count == len(unique_spells)

def test_excalibur_spell_set():
    """Test l'ensemble complet des sorts d'Excalibur"""
    print_header("TEST ENSEMBLE SORTS EXCALIBUR")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/magic-formulas/excalibur-spells", timeout=5)
        
        if response.status_code == 200:
            spell_set = response.json()
            
            inherited_count = spell_set.get("inheritedSpellsCount", 0)
            unique_count = spell_set.get("uniqueSpellsCount", 0)
            total_count = spell_set.get("totalSpellCount", 0)
            
            print_test_result("Récupération Spell Set", True, 
                            f"Total: {total_count} sorts ({inherited_count} hérités + {unique_count} uniques)")
            
            # Vérifier les sources d'héritage
            sources = spell_set.get("inheritanceSources", [])
            expected_sources = ["arthur_base", "excalibur_base", "magic_guild", "portal_lachin", "tatouages_memento"]
            
            sources_found = len([s for s in expected_sources if s in sources])
            print_test_result("Sources d'héritage", sources_found == len(expected_sources), 
                            f"{sources_found}/{len(expected_sources)} sources trouvées")
            
            return total_count >= 20  # Au moins 20 sorts au total
            
        else:
            print_test_result("Récupération Spell Set", False, f"HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Récupération Spell Set", False, f"Erreur: {e}")
        return False

def test_spell_combination():
    """Test la combinaison de sorts"""
    print_header("TEST COMBINAISON SORTS")
    
    try:
        # Test de combinaison de 2 sorts
        combination_request = {
            "spells": [
                {"name": "DIVINE_INTERVENTION", "source": "arthur_base"},
                {"name": "HOLY_STRIKE", "source": "excalibur_base"}
            ]
        }
        
        response = requests.post(f"{BACKEND_URL}/api/magic-formulas/combine-spells", 
                               json=combination_request, timeout=5)
        
        if response.status_code == 200:
            result = response.json()
            combined_spell = result.get("combinedSpell", {})
            
            success = combined_spell.get("name", "") != ""
            damage = combined_spell.get("damage", 0)
            
            print_test_result("Combinaison de sorts", success, 
                            f"Sort combiné: {combined_spell.get('name', 'N/A')}, Dégâts: {damage}")
            return success
            
        else:
            print_test_result("Combinaison de sorts", False, f"HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Combinaison de sorts", False, f"Erreur: {e}")
        return False

def test_excalibur_integration():
    """Test l'intégration complète avec Excalibur"""
    print_header("TEST INTÉGRATION EXCALIBUR")
    
    try:
        # Créer un jeu de test
        game_response = requests.post(f"{BACKEND_URL}/api/games", 
                                    json={"gameId": TEST_GAME_ID}, timeout=5)
        
        # Créer Arthur avec Excalibur
        hero_response = requests.post(f"{BACKEND_URL}/api/heroes", 
                                    json={
                                        "heroId": TEST_HERO_ID,
                                        "name": "Arthur",
                                        "artifact": "excalibur_arthur_fusion",
                                        "gameId": TEST_GAME_ID
                                    }, timeout=5)
        
        # Test d'utilisation d'un sort hérité
        spell_response = requests.post(f"{BACKEND_URL}/api/magic-formulas/cast-spell", 
                                     json={
                                         "heroId": TEST_HERO_ID,
                                         "spellName": "METEOR_SHOWER",
                                         "gameId": TEST_GAME_ID,
                                         "targetX": 10,
                                         "targetY": 10
                                     }, timeout=5)
        
        success = spell_response.status_code == 200
        if success:
            result = spell_response.json()
            damage = result.get("damage", 0)
            print_test_result("Cast Meteor Shower", success, f"Dégâts: {damage}")
        else:
            print_test_result("Cast Meteor Shower", False, f"HTTP {spell_response.status_code}")
        
        return success
        
    except Exception as e:
        print_test_result("Intégration Excalibur", False, f"Erreur: {e}")
        return False

def run_performance_test():
    """Test de performance du système de références"""
    print_header("TEST PERFORMANCE")
    
    start_time = time.time()
    
    # Test de résolution de 50 sorts
    test_spells = ["METEOR_SHOWER", "DIVINE_INTERVENTION", "HOLY_STRIKE"] * 17  # 51 sorts
    
    success_count = 0
    for i, spell in enumerate(test_spells[:50]):
        try:
            response = requests.post(f"{BACKEND_URL}/api/magic-formulas/resolve-reference", 
                                   json={"spellName": spell, "sourceArtifact": "test"}, 
                                   timeout=1)
            if response.status_code == 200:
                success_count += 1
        except:
            pass
    
    end_time = time.time()
    duration = end_time - start_time
    
    print_test_result("Performance Test", success_count >= 40, 
                    f"{success_count}/50 résolutions en {duration:.2f}s")
    
    return success_count >= 40

def generate_test_report():
    """Génère un rapport de test complet"""
    print_header("RAPPORT DE TEST FINAL")
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Exécuter tous les tests
    tests = [
        ("Connexion Backend", test_backend_connection),
        ("Spell Reference Resolver", test_spell_reference_resolver),
        ("Sorts Uniques Excalibur", test_excalibur_unique_spells),
        ("Ensemble Sorts Excalibur", test_excalibur_spell_set),
        ("Combinaison de Sorts", test_spell_combination),
        ("Intégration Excalibur", test_excalibur_integration),
        ("Performance", run_performance_test)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ ERREUR dans {test_name}: {e}")
            results.append((test_name, False))
    
    # Résumé final
    print(f"\n{'='*60}")
    print(f"📊 RÉSUMÉ FINAL - {timestamp}")
    print(f"{'='*60}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSÉ" if result else "❌ ÉCHOUÉ"
        print(f"{status} - {test_name}")
    
    print(f"\n🎯 SCORE GLOBAL: {passed}/{total} tests passés ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("🛋️ JEAN-GROFIGNON: MES FIDÈLES ! TOUS LES TESTS PASSENT ! EXCALIBUR EST OPÉRATIONNEL !")
    elif passed >= total * 0.8:
        print("⚗️ WALTER: Pas mal Jean ! 80%+ de réussite, le système fonctionne globalement !")
    else:
        print("🚨 Il y a des problèmes à corriger dans le système de références...")
    
    # Sauvegarder le rapport
    report = {
        "timestamp": timestamp,
        "tests": [{"name": name, "passed": result} for name, result in results],
        "summary": {
            "total_tests": total,
            "passed_tests": passed,
            "success_rate": passed/total*100
        }
    }
    
    with open(f"test-results/excalibur-references-{datetime.now().strftime('%Y%m%d_%H%M%S')}.json", "w") as f:
        json.dump(report, f, indent=2)
    
    return passed == total

if __name__ == "__main__":
    print("🗡️⚡ DÉMARRAGE TESTS EXCALIBUR RÉFÉRENCES")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Créer le dossier de résultats s'il n'existe pas
    import os
    os.makedirs("test-results", exist_ok=True)
    
    # Lancer les tests
    success = generate_test_report()
    
    if success:
        print("\n🗡️⚡ TOUS LES TESTS SONT PASSÉS ! EXCALIBUR EST PRÊT !")
    else:
        print("\n⚠️ CERTAINS TESTS ONT ÉCHOUÉ - VÉRIFIER LES DÉTAILS CI-DESSUS")
    
    exit(0 if success else 1) 