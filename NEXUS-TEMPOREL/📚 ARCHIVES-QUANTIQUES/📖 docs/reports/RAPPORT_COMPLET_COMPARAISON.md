# 📊 RAPPORT COMPLET - COMPARAISON GLOBALE DES PARSERS

**Date:** 2025-07-18 10:28:27

## 🎯 RÉSULTATS GLOBAUX


### 📊 MÉTRIQUES COMPLÈTES

| Type de Test | Parser REGEX | Parser ANTLR4 | Différence |
|-------------|-------------|---------------|------------|
| **Tests Backend Java** | 4480ms | 4535ms | 55ms |
| **Tests API REST** | 68ms | 53ms | -15ms |
| **Script Simple** | 0ms | 0ms | 0ms |
| **Script Comparaison** | 0ms | 0ms | 0ms |
| **Script Épique** | 0ms | 0ms | 0ms |
| **Stress Test Temporel** | 0ms | 0ms | 0ms |

### 🧪 RÉSULTATS DES TESTS

| Catégorie | REGEX | ANTLR4 | Status |
|-----------|--------|--------|---------|
| **Tests Backend** | 0 tests | 0 tests | ✅ REGEX / ✅ ANTLR4 |
| **Échecs Backend** | 0 | 0 | ✅ REGEX meilleur |

### 🎯 RECOMMANDATIONS

- **REGEX** est recommandé pour la production (plus rapide)
- Total REGEX: 4548ms
- Total ANTLR4: 4588ms

## 📋 DÉTAILS DES TESTS

### 🧪 Tests Backend Java

**REGEX Results:**
```
10:28:49.576 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils -- Could not detect default configuration classes for test class [com.heroesoftimepoc.temporalengine.ComplexScenarioTest]: ComplexScenarioTest does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
10:28:49.629 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper -- Found @SpringBootConfiguration com.heroesoftimepoc.temporalengine.TemporalEngineApplication for test class com.heroesoftimepoc.temporalengine.ComplexScenarioTest
10:28:49.697 [main] INFO org.springframework.boot.devtools.restart.RestartApplicationListener -- Restart disabled due to context in which it is running

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

2025-07-18T10:28:49.816+02:00  INFO 18461 --- [           main] c.h.temporalengine.ComplexScenarioTest   : Starting ComplexScenarioTest using Java 17.0.15 with PID 18461 (started by admin in /Users/admin/HOT/Heroes-of-Time/backend)
2025-07-18T10:28:49.817+02:00  INFO 18461 --- [           main] c.h.temporalengine.ComplexScenarioTest   : No active profile set, falling back to 1 default profile: "default"
2025-07-18T10:28:50.111+02:00  INFO 18461 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-07-18T10:28:50.145+02:00  INFO 18461 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 29 ms. Found 4 JPA repository interfaces.
2025-07-18T10:28:50.362+02:00  INFO 18461 --- [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-07-18T10:28:50.385+02:00  INFO 18461 --- [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.3.1.Final
2025-07-18T10:28:50.404+02:00  INFO 18461 --- [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-07-18T10:28:50.504+02:00  INFO 18461 --- [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-07-18T10:28:50.515+02:00  INFO 18461 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-07-18T10:28:50.601+02:00  INFO 18461 --- [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection conn0: url=jdbc:h2:mem:temporaldb user=SA
2025-07-18T10:28:50.602+02:00  INFO 18461 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-07-18T10:28:50.613+02:00  WARN 18461 --- [           main] org.hibernate.orm.deprecation            : HHH90000025: H2Dialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-07-18T10:28:51.087+02:00  INFO 18461 --- [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
Hibernate: drop table if exists game_players cascade 
Hibernate: drop table if exists game_tiles cascade 
Hibernate: drop table if exists games cascade 
Hibernate: drop table if exists hero_inventory cascade 
Hibernate: drop table if exists heroes cascade 
Hibernate: drop table if exists psi_states cascade 
Hibernate: drop table if exists tile_occupants cascade 
Hibernate: create table game_players (game_id bigint not null, player_id varchar(255))
Hibernate: create table game_tiles (defense_bonus integer, has_psi_states boolean, is_locked boolean, is_temporal_zone boolean, lock_duration integer, movement_cost integer, temporal_energy_bonus integer, x integer not null, y integer not null, game_id bigint, id bigint generated by default as identity, building_owner varchar(255), building_type varchar(255), temporal_zone_type varchar(255), terrain varchar(255), primary key (id))
Hibernate: create table games (current_turn integer, map_height integer, map_width integer, max_players integer, created_at timestamp(6), ended_at timestamp(6), id bigint generated by default as identity, started_at timestamp(6), current_player varchar(255), current_timeline varchar(255), game_name varchar(255) not null, status varchar(255) check (status in ('WAITING','ACTIVE','PAUSED','FINISHED','CANCELLED')), winner varchar(255), primary key (id))
Hibernate: create table hero_inventory (hero_id bigint not null, item varchar(255))
Hibernate: create table heroes (health integer, max_health integer, max_movement_points integer, max_temporal_energy integer, movement_points integer, position_x integer, position_y integer, temporal_energy integer, game_id bigint, id bigint generated by default as identity, name varchar(255) not null, player_id varchar(255), status varchar(255) check (status in ('ACTIVE','TEMPORAL_SHIFT','QUANTUM_SUPERPOSITION','COLLAPSED','DEAD')), timeline_branch varchar(255), primary key (id))
Hibernate: create table psi_states (delta_t integer, probability float(53), target_x integer, target_y integer, created_at timestamp(6), game_id bigint, id bigint generated by default as identity, action_type varchar(255), branch_id varchar(255), collapse_trigger varchar(255), expression TEXT, owner_hero varchar(255), psi_id varchar(255) not null unique, status varchar(255) check (status in ('ACTIVE','COLLAPSED','TRIGGERED','EXPIRED')), primary key (id))
Hibernate: create table tile_occupants (tile_id bigint not null, occupant varchar(255))
Hibernate: alter table if exists game_players add constraint FKrbr2flqdav5ovyjas7q92u64r foreign key (game_id) references games
Hibernate: alter table if exists game_tiles add constraint FK9jnp7yfteauo45smvmxa8710m foreign key (game_id) references games
Hibernate: alter table if exists hero_inventory add constraint FKox21x0dd4fg7w81h3a8o6chu foreign key (hero_id) references heroes
Hibernate: alter table if exists heroes add constraint FKb88jgdc3dfmmhbnrpl6u5sjdn foreign key (game_id) references games
Hibernate: alter table if exists psi_states add constraint FK9kbp67wo94i0jk9w4v3ja4meq foreign key (game_id) references games
Hibernate: alter table if exists tile_occupants add constraint FKia56skupqk3qxypotqpovr3gb foreign key (tile_id) references game_tiles
2025-07-18T10:28:51.122+02:00  INFO 18461 --- [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-07-18T10:28:51.288+02:00  INFO 18461 --- [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
2025-07-18T10:28:51.693+02:00  WARN 18461 --- [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-07-18T10:28:51.869+02:00  INFO 18461 --- [           main] o.s.b.a.h2.H2ConsoleAutoConfiguration    : H2 console available at '/h2-console'. Database available at 'jdbc:h2:mem:temporaldb'
2025-07-18T10:28:51.903+02:00  INFO 18461 --- [           main] c.h.temporalengine.ComplexScenarioTest   : Started ComplexScenarioTest in 2.212 seconds (process running for 2.673)
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Hibernate: insert into games (created_at,current_player,current_timeline,current_turn,ended_at,game_name,map_height,map_width,max_players,started_at,status,winner,id) values (?,?,?,?,?,?,?,?,?,?,?,?,default)

🔬 === TEST DE STRESS TEMPOREL ===
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ 5 héros créés
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ 10 ψ-états créés
✅ 5 ψ-états effondrés
✅ Test de stress réussi
Hibernate: insert into games (created_at,current_player,current_timeline,current_turn,ended_at,game_name,map_height,map_width,max_players,started_at,status,winner,id) values (?,?,?,?,?,?,?,?,?,?,?,?,default)

🎬 === DÉBUT DU SCÉNARIO ÉPIQUE TEMPOREL ===

🎭 ACTE I : Création des héros légendaires
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur Pendragon rejoint la bataille
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Ragnar Lothbrok entre en scène
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur se positionne en @15,15
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Ragnar se positionne en @25,25

🌀 ACTE II : Invocation des forces temporelles
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur invoque ψ001: Dragon temporel en @20,20
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Ragnar invoque ψ002: Phoenix temporel en @22,22
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur prépare ψ003: Bataille épique dans 3 tours

🔮 ACTE III : Utilisation des artefacts légendaires
✅ Arthur brandit la Lame d'Avant-Monde
✅ Ragnar active l'Horloge du Dernier Instant

🏰 ACTE IV : Constructions et recrutements
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur érige un château en @10,10
✅ Ragnar recrute 15 archers
✅ Arthur lance Fireball sur Ragnar

⚔️ ACTE V : Résolution temporelle
✅ ψ001 s'effondre : Le Dragon devient réel !
✅ ψ002 s'effondre : Le Phoenix se matérialise !
✅ Bataille épique : Dragon vs Phoenix !

🎯 VÉRIFICATIONS FINALES
✅ État du jeu validé
✅ Héros validés
✅ ψ-états validés

🎉 === SCÉNARIO ÉPIQUE TERMINÉ AVEC SUCCÈS ===
🏆 Tous les mécanismes temporels fonctionnent parfaitement !
Hibernate: insert into games (created_at,current_player,current_timeline,current_turn,ended_at,game_name,map_height,map_width,max_players,started_at,status,winner,id) values (?,?,?,?,?,?,?,?,?,?,?,?,default)

📊 === MÉTRIQUES DE PERFORMANCE ===
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)

📈 RÉSULTATS DE PERFORMANCE :
Commandes totales : 100
Commandes réussies : 100
Taux de succès : 100,0%
Temps total : 73 ms
Temps moyen/commande : 0,73 ms
Commandes/seconde : 1370
✅ Métriques de performance validées
```

**ANTLR4 Results:**
```
10:29:28.604 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils -- Could not detect default configuration classes for test class [com.heroesoftimepoc.temporalengine.ComplexScenarioTest]: ComplexScenarioTest does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
10:29:28.660 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper -- Found @SpringBootConfiguration com.heroesoftimepoc.temporalengine.TemporalEngineApplication for test class com.heroesoftimepoc.temporalengine.ComplexScenarioTest
10:29:28.724 [main] INFO org.springframework.boot.devtools.restart.RestartApplicationListener -- Restart disabled due to context in which it is running

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

2025-07-18T10:29:28.832+02:00  INFO 18674 --- [           main] c.h.temporalengine.ComplexScenarioTest   : Starting ComplexScenarioTest using Java 17.0.15 with PID 18674 (started by admin in /Users/admin/HOT/Heroes-of-Time/backend)
2025-07-18T10:29:28.832+02:00  INFO 18674 --- [           main] c.h.temporalengine.ComplexScenarioTest   : No active profile set, falling back to 1 default profile: "default"
2025-07-18T10:29:29.138+02:00  INFO 18674 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-07-18T10:29:29.172+02:00  INFO 18674 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 31 ms. Found 4 JPA repository interfaces.
2025-07-18T10:29:29.390+02:00  INFO 18674 --- [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-07-18T10:29:29.411+02:00  INFO 18674 --- [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.3.1.Final
2025-07-18T10:29:29.433+02:00  INFO 18674 --- [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-07-18T10:29:29.533+02:00  INFO 18674 --- [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-07-18T10:29:29.543+02:00  INFO 18674 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-07-18T10:29:29.629+02:00  INFO 18674 --- [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection conn0: url=jdbc:h2:mem:temporaldb user=SA
2025-07-18T10:29:29.629+02:00  INFO 18674 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-07-18T10:29:29.642+02:00  WARN 18674 --- [           main] org.hibernate.orm.deprecation            : HHH90000025: H2Dialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-07-18T10:29:30.119+02:00  INFO 18674 --- [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
Hibernate: drop table if exists game_players cascade 
Hibernate: drop table if exists game_tiles cascade 
Hibernate: drop table if exists games cascade 
Hibernate: drop table if exists hero_inventory cascade 
Hibernate: drop table if exists heroes cascade 
Hibernate: drop table if exists psi_states cascade 
Hibernate: drop table if exists tile_occupants cascade 
Hibernate: create table game_players (game_id bigint not null, player_id varchar(255))
Hibernate: create table game_tiles (defense_bonus integer, has_psi_states boolean, is_locked boolean, is_temporal_zone boolean, lock_duration integer, movement_cost integer, temporal_energy_bonus integer, x integer not null, y integer not null, game_id bigint, id bigint generated by default as identity, building_owner varchar(255), building_type varchar(255), temporal_zone_type varchar(255), terrain varchar(255), primary key (id))
Hibernate: create table games (current_turn integer, map_height integer, map_width integer, max_players integer, created_at timestamp(6), ended_at timestamp(6), id bigint generated by default as identity, started_at timestamp(6), current_player varchar(255), current_timeline varchar(255), game_name varchar(255) not null, status varchar(255) check (status in ('WAITING','ACTIVE','PAUSED','FINISHED','CANCELLED')), winner varchar(255), primary key (id))
Hibernate: create table hero_inventory (hero_id bigint not null, item varchar(255))
Hibernate: create table heroes (health integer, max_health integer, max_movement_points integer, max_temporal_energy integer, movement_points integer, position_x integer, position_y integer, temporal_energy integer, game_id bigint, id bigint generated by default as identity, name varchar(255) not null, player_id varchar(255), status varchar(255) check (status in ('ACTIVE','TEMPORAL_SHIFT','QUANTUM_SUPERPOSITION','COLLAPSED','DEAD')), timeline_branch varchar(255), primary key (id))
Hibernate: create table psi_states (delta_t integer, probability float(53), target_x integer, target_y integer, created_at timestamp(6), game_id bigint, id bigint generated by default as identity, action_type varchar(255), branch_id varchar(255), collapse_trigger varchar(255), expression TEXT, owner_hero varchar(255), psi_id varchar(255) not null unique, status varchar(255) check (status in ('ACTIVE','COLLAPSED','TRIGGERED','EXPIRED')), primary key (id))
Hibernate: create table tile_occupants (tile_id bigint not null, occupant varchar(255))
Hibernate: alter table if exists game_players add constraint FKrbr2flqdav5ovyjas7q92u64r foreign key (game_id) references games
Hibernate: alter table if exists game_tiles add constraint FK9jnp7yfteauo45smvmxa8710m foreign key (game_id) references games
Hibernate: alter table if exists hero_inventory add constraint FKox21x0dd4fg7w81h3a8o6chu foreign key (hero_id) references heroes
Hibernate: alter table if exists heroes add constraint FKb88jgdc3dfmmhbnrpl6u5sjdn foreign key (game_id) references games
Hibernate: alter table if exists psi_states add constraint FK9kbp67wo94i0jk9w4v3ja4meq foreign key (game_id) references games
Hibernate: alter table if exists tile_occupants add constraint FKia56skupqk3qxypotqpovr3gb foreign key (tile_id) references game_tiles
2025-07-18T10:29:30.147+02:00  INFO 18674 --- [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-07-18T10:29:30.341+02:00  INFO 18674 --- [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
ANTLR Tool version 4.10.1 used for code generation does not match the current runtime version 4.13.1
ANTLR Runtime version 4.10.1 used for parser compilation does not match the current runtime version 4.13.1
2025-07-18T10:29:30.805+02:00  WARN 18674 --- [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-07-18T10:29:30.963+02:00  INFO 18674 --- [           main] o.s.b.a.h2.H2ConsoleAutoConfiguration    : H2 console available at '/h2-console'. Database available at 'jdbc:h2:mem:temporaldb'
2025-07-18T10:29:30.994+02:00  INFO 18674 --- [           main] c.h.temporalengine.ComplexScenarioTest   : Started ComplexScenarioTest in 2.276 seconds (process running for 2.757)
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Hibernate: insert into games (created_at,current_player,current_timeline,current_turn,ended_at,game_name,map_height,map_width,max_players,started_at,status,winner,id) values (?,?,?,?,?,?,?,?,?,?,?,?,default)

🔬 === TEST DE STRESS TEMPOREL ===
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ 5 héros créés
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ 10 ψ-états créés
✅ 5 ψ-états effondrés
✅ Test de stress réussi
Hibernate: insert into games (created_at,current_player,current_timeline,current_turn,ended_at,game_name,map_height,map_width,max_players,started_at,status,winner,id) values (?,?,?,?,?,?,?,?,?,?,?,?,default)

🎬 === DÉBUT DU SCÉNARIO ÉPIQUE TEMPOREL ===

🎭 ACTE I : Création des héros légendaires
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur Pendragon rejoint la bataille
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Ragnar Lothbrok entre en scène
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur se positionne en @15,15
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Ragnar se positionne en @25,25

🌀 ACTE II : Invocation des forces temporelles
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur invoque ψ001: Dragon temporel en @20,20
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Ragnar invoque ψ002: Phoenix temporel en @22,22
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur prépare ψ003: Bataille épique dans 3 tours

🔮 ACTE III : Utilisation des artefacts légendaires
✅ Arthur brandit la Lame d'Avant-Monde
✅ Ragnar active l'Horloge du Dernier Instant

🏰 ACTE IV : Constructions et recrutements
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
✅ Arthur érige un château en @10,10
✅ Ragnar recrute 15 archers
✅ Arthur lance Fireball sur Ragnar

⚔️ ACTE V : Résolution temporelle
✅ ψ001 s'effondre : Le Dragon devient réel !
✅ ψ002 s'effondre : Le Phoenix se matérialise !
✅ Bataille épique : Dragon vs Phoenix !

🎯 VÉRIFICATIONS FINALES
✅ État du jeu validé
✅ Héros validés
✅ ψ-états validés

🎉 === SCÉNARIO ÉPIQUE TERMINÉ AVEC SUCCÈS ===
🏆 Tous les mécanismes temporels fonctionnent parfaitement !
Hibernate: insert into games (created_at,current_player,current_timeline,current_turn,ended_at,game_name,map_height,map_width,max_players,started_at,status,winner,id) values (?,?,?,?,?,?,?,?,?,?,?,?,default)

📊 === MÉTRIQUES DE PERFORMANCE ===
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into game_tiles (building_owner,building_type,defense_bonus,game_id,has_psi_states,is_locked,is_temporal_zone,lock_duration,movement_cost,temporal_energy_bonus,temporal_zone_type,terrain,x,y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into heroes (game_id,health,max_health,max_movement_points,max_temporal_energy,movement_points,name,player_id,position_x,position_y,status,temporal_energy,timeline_branch,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)
Hibernate: insert into psi_states (action_type,branch_id,collapse_trigger,created_at,delta_t,expression,game_id,owner_hero,probability,psi_id,status,target_x,target_y,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,default)

📈 RÉSULTATS DE PERFORMANCE :
Commandes totales : 100
Commandes réussies : 100
Taux de succès : 100,0%
Temps total : 80 ms
Temps moyen/commande : 0,80 ms
Commandes/seconde : 1250
✅ Métriques de performance validées
```
