import m from 'mithril';
import { render } from 'mithril-ui-form';
import { Dashboards } from '../models';
import { MeiosisComponent } from '../services';

const md = `#### Innovation in Workplace Wellbeing

##### Doel van het onderzoek

Ontwikkeling van een innovatief Workplace Wellbeing Dashboard

In Nederland hebben op dit moment meer dan 1,3 miljoen mensen last van chronische stress klachten. Over de afgelopen 10 jaar stijgen deze aantallen nog steeds ondanks de vele aandacht en initiatieven. Dit is zorgelijk. Langdurige stress kan leiden tot burn-out, welvaartziektes, en problemen op het werk. Organisaties hebben daarom behoefte om beter te kunnen sturen op behoud van wellbeing van hun werknemers. TNO, Deloitte en Zilveren Kruis ontwikkelen hiervoor een innovatief Wellbeing Dashboard. Het dashboard bevat een simulatiemodel waarin alle (f)actoren die bijdragen aan behoud van wellbeing van een individu op het werk is samengevat. Sinds 2020 doen DSM, Achmea en Gemeente Amsterdam actief mee aan deze ontwikkeling.

Met het Dashboard zal het mogelijk zijn om via simulaties onderzoek te doen naar effecten van veranderingen op het werk in bv. gedrag, cultuur, hulpbronnen, of interventie-programma’s op de wellbeing van werkenden.Hiervoor hebben we data en kennis nodig over de veranderingen door de tijd heen.

Vraag de onderzoeker [Heleen Wortelboer](mailto:heleen.wortelboer@tno.nl) om uitleg als u nog vragen heeft.`;

export const AboutPage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => setPage(Dashboards.ABOUT),
  view: () => m('.row', m.trust(render(md))),
});
