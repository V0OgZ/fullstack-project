# 🔧 FIX : Problème JPA avec PsiState

## 🐛 Erreur Actuelle
```
Could not determine recommended JdbcType for Java type 'com.heroesoftimepoc.temporalengine.model.PsiState'
```

## 📊 Analyse du Problème

L'erreur vient de Hibernate qui ne peut pas déterminer comment mapper PsiState. Après investigation :

1. **PsiState est bien une @Entity** ✅
2. **La relation @ManyToOne avec Game existe** ✅  
3. **ComplexAmplitude a maintenant @Embedded** ✅
4. **Tous les champs semblent corrects** ✅

## 🎯 Cause Probable

L'erreur mentionne `BasicCollectionJavaType` ce qui suggère que Hibernate essaie de traiter PsiState comme un type basique dans une collection, au lieu d'une entité.

## 🔍 Solutions Tentées

1. ✅ Ajout de `@Embedded` sur ComplexAmplitude
2. ✅ Ajout de `@JsonIgnore` sur la relation Game dans PsiState
3. ⏳ Ajout de `orphanRemoval = true` sur la relation dans Game

## 💡 Solution Recommandée

Le problème pourrait venir d'une référence circulaire ou d'un mapping incorrect quelque part. Actions à faire :

### 1. Vérifier les imports
S'assurer que tous les imports JPA sont corrects (jakarta.persistence.*)

### 2. Nettoyer et recompiler
```bash
cd backend
mvn clean compile
```

### 3. Si le problème persiste
Ajouter une configuration explicite dans JpaConfig :
```java
@Bean
public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    // Configuration explicite des entités
}
```

### 4. Alternative : Utiliser des DTOs
Au lieu de retourner directement les entités, utiliser des DTOs pour éviter les problèmes de sérialisation.

## 🚀 Prochaines Étapes

1. Nettoyer le build
2. Vérifier s'il y a des annotations conflictuelles
3. Possiblement migrer vers des DTOs pour l'API

---
*"When JPA fights back, clean build attacks!"* 🎯 