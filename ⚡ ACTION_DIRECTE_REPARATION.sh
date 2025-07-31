#!/bin/bash

echo "⚡ ACTION DIRECTE - RÉPARATION BACKEND"
echo "🚨 MERLIN DIRECT MODE : PAS DE DOC, JUSTE ACTION !"
echo ""

echo "🔧 ACTION 1 : TESTER SCRIPT HOTS"
../../HOT/Heroes-of-Time/hots status

echo ""
echo "🔧 ACTION 2 : REDÉMARRER BACKEND"
../../HOT/Heroes-of-Time/hots start

echo ""
echo "🔧 ACTION 3 : TESTER API WALTER"
sleep 3
curl -X GET "http://localhost:8080/api/health" 2>/dev/null && echo "✅ BACKEND UP" || echo "❌ ENCORE DOWN"

echo ""
echo "🔧 ACTION 4 : TESTER TRADUCTION"
curl -X POST "http://localhost:8080/api/translate/scenario" \
  -H "Content-Type: application/json" \
  -d '{"scenario":"GRUT_CALM_NOW"}' 2>/dev/null && echo "✅ TRADUCTION OK" || echo "❌ TRADUCTION KO"

echo ""
echo "⚡ ACTION DIRECTE TERMINÉE !"
echo "👁️ GRUT DEVRAIT ÊTRE MOINS EN COLÈRE"