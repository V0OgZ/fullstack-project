#!/bin/bash

# 🌀 TEST API LE BUREAU
echo "=========================================="
echo "🌀 TEST API LE BUREAU - GRUT SURVEILLE"
echo "=========================================="

API_BASE="http://localhost:8080/api/bureau"

# Test 1: État temporel
echo -e "\n📊 Test 1: État temporel du Bureau"
curl -s "$API_BASE/temporal-state" | jq '.'

# Test 2: Scan McKinsey
echo -e "\n🔍 Test 2: Scan pour McKinsey"
curl -s "$API_BASE/scan-mckinsey" | jq '.'

# Test 3: Vision Panopticon
echo -e "\n👁️ Test 3: Vision Panopticon"
curl -s "$API_BASE/panopticon/vision" | jq '.'

# Test 4: Archives classifiées
echo -e "\n📂 Test 4: Accès archives PANOPTICON_ROUGE"
curl -s "$API_BASE/archives/PANOPTICON_ROUGE" | jq '.'

# Test 5: Statut du canapé de Jean
echo -e "\n🛋️ Test 5: Statut du canapé cosmique"
curl -s "$API_BASE/canape/status" | jq '.'

# Test 6: Enregistrer événement temporel
echo -e "\n⏰ Test 6: Enregistrer événement temporel"
curl -s -X POST "$API_BASE/timeline-event" \
  -H "Content-Type: application/json" \
  -d '{"type":"test","message":"GRUT teste le système"}' | jq '.'

# Test 7: Ouvrir interstice
echo -e "\n🚪 Test 7: Ouvrir interstice vers TOUR_SOMBRE"
curl -s -X POST "$API_BASE/interstice/open?destination=TOUR_SOMBRE" | jq '.'

echo -e "\n=========================================="
echo "✅ Tests API Le Bureau terminés"
echo "GRUT VOIT TOUT. LA RÉALITÉ N'EST PAS À VENDRE."
echo "==========================================" 