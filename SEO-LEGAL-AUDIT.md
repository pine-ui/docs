# Pine SEO és jogi ellenőrzés

Dátum: 2026-10-07. Céloldal: https://pine-ui.com/. Ez a jelentés a weboldal kódjának, az élő HTTP-válaszoknak és nyilvános elsődleges forrásoknak az ellenőrzése. Nem igazolja az üzemeltető személyét, adózási helyzetét vagy szolgáltatói szerződéseit. Az alkalmazandó joghatóságot sem lehet a fejlesztőgép időzónájából megállapítani.

## Indexelés

Az ellenőrzés kezdetén az élő sitemap 32 URL-t tartalmazott; a képen látható 17 URL korábbi állapot. Mind a 32 URL 200 választ adott, saját, záró perjeles canonical címmel és indexelési tiltás nélkül. A www főoldal 301-gyel a pine-ui.com címre irányít. A robots.txt engedi a feltérképezést és a helyes sitemapet hivatkozza. A tartalom szerepel a kezdeti HTML-ben. A belső keresőoldal szándékosan noindex.

A „feltérképezve, jelenleg nincs indexelve” állapot okát a képernyőkép nem dönti el. Nem találtunk bizonyított, általános indexelési tiltást. Az átirányított URL kizárása önmagában megfelelő viselkedés. Nem állítható, hogy a SEO-módosítások után a Google biztosan indexelni fog.

Javítások: mind a 30 publikált dokumentációs oldal explicit, egyedi leírást kapott; a túl általános címek pontosabbak lettek, a rövid oldalsávnevek megmaradtak. A forrásdokumentáció ugyanezeket a metaadatokat használja. A főoldal telepítési és kompatibilitási információt, belső linkeket és SoftwareSourceCode strukturált adatot kapott. Nincs kitalált értékelés, kereskedelmi ajánlat vagy ellenőrizetlen szervezeti adat.

A build végén az `assistant/check-links.mjs` ellenőrzi az összes sitemap-oldal canonical címét, indexelhetőségét, egyedi címét/leírását, főcímét és a JSON-LD érvényességét. A `--live` kapcsoló az élő státuszt és a publikált metaadatok egyezését is ellenőrzi.

Search Console következő lépések:

1. Az URL-ellenőrzésben vizsgálni kell a főoldalt és a hat kizárt URL-t: utolsó feltérképezés, HTTP-állapot, engedélyezett indexelés, megadott és Google által kiválasztott canonical.
2. A módosítások publikálása után kérni kell a főoldal és a telepítési útmutató indexelését. A sitemap URL-je változatlan: https://pine-ui.com/sitemap.xml.
3. Az átirányított URL helyett annak végső célját kell értékelni. Az azonos sitemap ismételt beküldése és az ismételt indexelési kérelem nem garantál eredményt.

Nem állt rendelkezésre hitelesített Search Console-hozzáférés vagy a hat URL listája. Az indexelési kérelmek ezért nincsenek beküldve. [Google: újrafeltérképezés kérése](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [sitemap korlátai](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [canonical jelzések](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Jogi megállapítások

| Terület | Megállapítás és szükséges lépés |
| --- | --- |
| Adatkezelő azonosítása | **Nyitott.** A KbeniM felhasználónév nem igazolja a jogi adatkezelő személyét. A tényleges név és elérhetőség szükséges a teljes adatkezelési tájékoztatóhoz. A nyilvános cím, adó- és nyilvántartási adatok kötelezettségét az üzemeltető státusza és az alkalmazandó szolgáltatói szabályok alapján kell eldönteni. |
| GDPR-tájékoztató | **Nyitott.** Meg kell adni az adatkezelési célokat és jogalapokat, jogos érdek esetén az érdekeket, címzetteket, megőrzést, adattovábbítási garanciákat, joggyakorlási kapcsolatot és panaszlehetőséget. A `/data-use/` technikai ismertető, kifejezetten nem teljes GDPR-tájékoztató. |
| AI átláthatósága | Az asszisztens az elküldés előtt látható AI-jelölést, hibalehetőségről és Cloudflare-adatküldésről szóló tájékoztatást kapott. Ez az AI Act 50. cikkében szereplő átláthatósági követelmény irányába tett technikai javítás; önmagában nem teljes AI Act-audit. |
| Adattakarékosság | A kliens kérdést, dokumentációverziót, oldali útvonalat és legfeljebb hat korábbi üzenetet küld. Az AI-nak releváns nyilvános dokumentáció kerül mellé. A backend kódja nem ment beszélgetésadatbázist; a kvótatároló időpontokat és foglalási azonosítókat tart. Ez nem zárja ki a szolgáltatói infrastruktúra naplózását. |
| IP-azonosító | Az IP és UTC-dátum SHA-256 hash-e **álnevesített**, nem anonim. A kvótabejegyzések törlése 24 órás szabályokat követ. A nyers IP hosting/CDN-szinten továbbra is feldolgozható. |
| Böngészőtárolás és cookie | A témaválasztás localStorage-ban, a chat legfeljebb 40 üzenete sessionStorage-ban marad. A chat már nem ír új állapotot pusztán az oldal megnyitásakor. Beszélgetéstörlés hozzáadva. A kód nem tartalmaz reklám- vagy analitikai trackert; szükségtelen univerzális cookie-bannert ezért nem adtunk hozzá. A CDN biztonsági cookie-jait, tényleges beállításait és a helyi szabályok szerinti mentességet még ellenőrizni kell. |
| Szolgáltatók és adattovábbítás | **Nyitott.** GitHub Pages, Cloudflare CDN, Workers és Workers AI érintett. Az adott fiókok szerződéses szerepeit, alkalmazandó adatfeldolgozási feltételeit, nemzetközi adattovábbításait és logmegőrzését ellenőrizni kell. Nincs igazolt kizárólagos EU-adatfeldolgozás. |
| Modell és tanítás | Cloudflare nyilvános Workers AI tájékoztatása szerint nincs saját vagy harmadik fél szolgáltatásának fejlesztésére/tanítására felhasználás külön hozzájárulás nélkül. A használt Qwen modell licencének és az adott szolgáltatási feltételeknek az üzemeltetői elfogadását ez a kódaudit nem igazolja. |
| Licenc és szerzői jog | MIT licenc jelen van. A Liberation Sans OFL és a Unity/TMP erőforrások külön licencét a csomag notice fájlja leírja. Nyilvános licencoldal és pontosabb footer készült. A webes függőségek külön licencnotice fájljai megmaradnak. A kabala eredetének és felhasználási jogainak dokumentumai nem álltak rendelkezésre. |
| Önkéntes támogatás | A Buy Me a Coffee külső link, nincs helyi fizetési űrlap. A támogatási oldal tisztázza, hogy a fizetés nem szükséges a Pine használatához, és a külső fizetési feltételek érvényesek. A bevételek adózása, esetleges ismétlődő támogatások és fogyasztóvédelmi kötelezettségek az üzemeltető tényleges tevékenységétől függnek; nem igazoltak. |
| ÁSZF, fogyasztóvédelem, akadálymentesség | A jelenlegi ingyenes dokumentáció alapján nem helyes automatikusan webáruházi ÁSZF-et vagy elállási űrlapot létrehozni. Fizetős szolgáltatás, üzletszerű működés és a tényleges célközönség esetén külön vizsgálat kell. A hozzáadott elemek natív linkek/gombok; teljes akadálymentességi megfelelőség nincs tanúsítva. |

Elsődleges jogi és szolgáltatói források:

- [GDPR, különösen 5–6., 12–13., 15–22., 28. és 44–49. cikk](https://eur-lex.europa.eu/eli/reg/2016/679/oj).
- [2001. évi CVIII. törvény, különösen 4. §](https://njt.hu/jogszabaly/2001-108-00-00).
- [Elektronikus hírközlési törvény, különösen 155. §](https://njt.hu/jogszabaly/2003-100-00-00); [ePrivacy irányelv 5. cikk (3)](https://eur-lex.europa.eu/eli/dir/2002/58/oj).
- [AI Act, különösen 50. cikk](https://eur-lex.europa.eu/eli/reg/2024/1689).
- [GitHub Pages IP-naplózás](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [GitHub adatvédelem](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- [Cloudflare adatvédelem](https://www.cloudflare.com/privacypolicy/), [Workers AI adatkezelés](https://developers.cloudflare.com/workers-ai/platform/data-usage/).

## Mi kell a jogi lezáráshoz?

Az üzemeltetőnek meg kell adnia a tényleges jogi nevét, adatvédelmi elérhetőségét, országát és azt, hogy magánszemélyként vagy vállalkozásként működteti az oldalt. Az alkalmazandó szabályok alapján ezután dönthető el a cím és vállalkozási adatok közlése. Meg kell erősíteni a szolgáltatói szerződéseket, megőrzési időket és adattovábbítási garanciákat, majd ezekkel véglegesíteni a teljes tájékoztatót és szükség esetén az impresszumot.

**Jelenleg nem állítható, hogy az oldal jogilag teljesen megfelelő.** A hiányzó tényeket nem helyettesíti egy általános sablon vagy egy hozzájárulási checkbox.

## Ellenőrzési eredmények

- A helyi production build sikeres; 253 dokumentációs hivatkozás és 34 sitemap-oldal SEO-ellenőrzése sikeres.
- Mind a 16 meglévő dokumentációs, asszisztens- és interaktívpélda-teszt sikeres; a formázás ellenőrzése is sikeres.
- Helyi böngészőben a főoldal, az adatfolyam-ismertető és a helyi keresési mód ellenőrizve. A próbaüzenet a Clear conversation használata és újratöltés után sem jelent meg.
- Ez nem Google-indexelési bizonyíték, teljes akadálymentességi audit vagy a szolgáltatói dashboardok/szerződések ellenőrzése.
