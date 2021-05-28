import { Answers } from '../models';

export const valueToScore = (q: keyof Answers, value: number) => {
  switch (q) {
    case 'Q02_life_events_leefstijl':
    case 'Q01_life_events_zin':
      return value === 5 /* N.v.t */ ? 5 : value * 2.5;
    case 'Q03_org_midd_craften':
    case 'Q05_energiegevers_herstellen':
    case 'Q06_leider_hulpbronnen':
    case 'Q07_leider_taakeisen':
    case 'Q08_leider_veiligklimaat':
    case 'Q04_energiegevers_loskomen':
      return value * 2.5;
    default:
      return value;
  }
};

export const avgAnswers = {
  Q01_crafting: 7.173611111111095,
  Q01_life_events_zin: 5.503472222222211 / 2.5,
  Q01_taakeisen: 6.531249999999982,
  Q01_zin_betekenis: 7.135416666666649,
  Q02_crafting_behoefte: 7.239583333333318,
  Q02_crafting: 7.5520833333333215,
  Q02_life_events_leefstijl: 5.6857638888888795 / 2.5,
  Q02_taakeisen_uitdaging: 6.5277777777777635,
  Q03_crafting_behoefte: 7.611111111111098,
  Q03_crafting: 5.954861111111108,
  Q03_org_midd_craften: 5.868055555555547 / 2.5,
  Q03_taakeisen_obstakel: 3.4166666666666705,
  Q04_crafting_behoefte: 7.968749999999992,
  Q04_crafting: 6.909722222222207,
  Q04_energiegevers_loskomen: 5.911458333333329 / 2.5,
  Q04_werkhulpbronnen: 6.565972222222208,
  Q05_crafting: 6.340277777777769,
  Q05_energiegevers_herstellen: 5.468749999999991 / 2.5,
  Q05_positieve_ervaringen_werk: 6.812499999999989,
  Q05_psycap: 8.309027777777775,
  Q06_Effectieve_zelfsturing: 6.9340277777777635,
  Q06_leider_hulpbronnen: 5.911458333333328 / 2.5,
  Q06_psycap: 7.486111111111099,
  Q06_zelfondermijnend_gedrag: 2.9479166666666705,
  Q07_Effectieve_zelfsturing: 6.128472222222212,
  Q07_inspanning_capaciteit: 7.177083333333322,
  Q07_leider_taakeisen: 5.407986111111102 / 2.5,
  Q07_psycap: 7.600694444444431,
  Q08_Extra_inspanning: 6.795138888888881,
  Q08_inspanning_geleverd: 7.076388888888877,
  Q08_leider_veiligklimaat: 6.006944444444445 / 2.5,
  Q08_psycap: 7.954861111111099,
  Q09_Extra_inspanning: 6.3159722222222126,
  Q09_gezklachten: 1.4097222222222225,
  Q10_Extra_inspanning: 5.111111111111111,
  Q10_leefstijl: 7.312499999999987,
  Q11_bevlogenheid: 6.381944444444437,
  Q12_bevlogenheid: 7.076388888888878,
  Q13_bevlogenheid: 6.663194444444431,
  Q14_Psych_loskomen_werk: 6.77083333333333,
  Q15_Psych_loskomen_werk: 6.694444444444442,
  Q16_belang_taakeisen_halen: 7.958333333333327,
  Q17_belang_taakeisen_halen: 8.284722222222216,
  Q18_basic_needs: 7.628472222222218,
  Q19_basic_needs: 7.812499999999991,
  Q20_basic_needs: 6.843749999999994,
  Q21_burnout: 3.045138888888891,
  Q22_burnout: 3.7152777777777826,
  Q23_veilig_psychsoc_klimaat: 7.069444444444436,
  Q01_leeftijd: 45.36,
  Q02_geslacht: 2.56,
  Q02_vast_aantal_uren_aantal: 34.52,
  Q03_dienstjaren: 13.98,
  Q05_vast_aantal_uren_aantal: 33.29,
  saved: true,
  timestamp: 0,
} as Answers;
