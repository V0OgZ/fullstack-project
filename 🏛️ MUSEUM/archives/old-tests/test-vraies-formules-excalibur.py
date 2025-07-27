#!/usr/bin/env python3
"""
🗡️⚡ TEST VRAIES FORMULES EXCALIBUR
Test les vraies formules d'Excalibur avec le MagicFormulaEngine

@author: Jean-Grofignon (Canapé Cosmique)
"""

import requests
import json
import time

def test_vraies_formules_excalibur():
    """Teste les vraies formules d'Excalibur avec le moteur"""
    
    print("🗡️⚡ TEST VRAIES FORMULES EXCALIBUR AVEC MOTEUR")
    print("="*60)
    
    # Lire le VRAI fichier Excalibur
    try:
        with open('game_assets/artifacts/legendary/excalibur_arthur_fusion.json', 'r') as f:
            excalibur_data = json.load(f)
        print(f"✅ Excalibur chargé: {excalibur_data['name']}")
    except Exception as e:
        print(f"❌ Erreur lecture Excalibur: {e}")
        return False
    
    # Extraire les VRAIES formules
    if 'combat_formulas' not in excalibur_data:
        print("❌ Pas de formules de combat trouvées dans Excalibur !")
        return False
    
    vraies_formules = excalibur_data['combat_formulas']
    print(f"🎯 {len(vraies_formules)} formules de combat trouvées")
    print()
    
    # Tester chaque formule avec le MagicFormulaEngine
    success_count = 0
    
    for i, formule_data in enumerate(vraies_formules, 1):
        formule_id = formule_data['id']
        formule_name = formule_data['name']
        formule_text = formule_data['formula']
        
        print(f"{i}. TEST {formule_id}: {formule_name}")
        print(f"   Formule: {formule_text}")
        
        try:
            # Test avec l'endpoint MagicFormulaEngine
            response = requests.post(
                'http://localhost:8080/api/magic-formulas/execute',
                json={
                    'formula': formule_text,
                    'gameId': 'excalibur_test',
                    'heroId': 'arthur_excalibur_fusion'
                },
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ SUCCÈS: {result.get('message', 'Exécuté')}")
                
                # Afficher les détails si disponibles
                if 'result' in result:
                    result_data = result['result']
                    if isinstance(result_data, dict):
                        if 'damage' in result_data:
                            print(f"   💥 Dégâts: {result_data['damage']}")
                        if 'effect' in result_data:
                            print(f"   ⚡ Effet: {result_data['effect']}")
                
                success_count += 1
                
            elif response.status_code == 404:
                print(f"   ❌ ENDPOINT NON TROUVÉ (404)")
                
            else:
                print(f"   ❌ ÉCHEC: HTTP {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   📋 Détails: {error_data.get('message', 'Pas de détails')}")
                except:
                    pass
                    
        except requests.exceptions.ConnectionError:
            print(f"   ❌ CONNEXION ÉCHOUÉE - Backend pas démarré ?")
            
        except Exception as e:
            print(f"   ❌ ERREUR: {e}")
        
        print()
        time.sleep(0.5)  # Petite pause entre les tests
    
    # Résumé
    print("="*60)
    print(f"📊 RÉSULTATS: {success_count}/{len(vraies_formules)} formules testées avec succès")
    
    if success_count == len(vraies_formules):
        print("🛋️ JEAN-GROFIGNON: MES FIDÈLES ! TOUTES LES FORMULES MARCHENT ! EXCALIBUR EST OPÉRATIONNEL !")
        return True
    elif success_count > 0:
        print("⚗️ WALTER: Quelques formules marchent Jean ! Il faut corriger les autres...")
        return False
    else:
        print("🚨 AUCUNE FORMULE NE MARCHE - Il faut vérifier le moteur !")
        return False

def test_formules_temporelles():
    """Teste aussi les formules temporelles d'Excalibur"""
    
    print("\n🕰️ TEST FORMULES TEMPORELLES EXCALIBUR")
    print("="*50)
    
    try:
        with open('game_assets/artifacts/legendary/excalibur_arthur_fusion.json', 'r') as f:
            excalibur_data = json.load(f)
        
        if 'temporal_formulas' in excalibur_data:
            temporal_formulas = excalibur_data['temporal_formulas']
            print(f"🎯 {len(temporal_formulas)} formules temporelles trouvées")
            
            for formule_data in temporal_formulas:
                formule_id = formule_data['id']
                formule_name = formule_data['name']
                formule_text = formule_data['formula']
                
                print(f"- {formule_id}: {formule_name}")
                print(f"  {formule_text}")
                
                # Test rapide
                try:
                    response = requests.post(
                        'http://localhost:8080/api/magic-formulas/execute',
                        json={'formula': formule_text, 'gameId': 'test', 'heroId': 'arthur'},
                        timeout=3
                    )
                    
                    status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
                    print(f"  Status: {status}")
                    
                except Exception as e:
                    print(f"  Status: ❌ Erreur: {e}")
                
                print()
        else:
            print("❌ Pas de formules temporelles trouvées")
            
    except Exception as e:
        print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    print("🗡️⚡ DÉMARRAGE TEST VRAIES FORMULES EXCALIBUR")
    print(f"Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Test principal
    success = test_vraies_formules_excalibur()
    
    # Test bonus des formules temporelles
    test_formules_temporelles()
    
    print("\n🗡️⚡ FIN DES TESTS")
    exit(0 if success else 1) 