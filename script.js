  const SOLUTION = "BILDSCHIRM";

  const stations = [
    {
      name: "Pünt-Sommergarten",
      meta: "Restaurant · 4.5 (4)",
      badge: "Zahlensysteme",
      task: "Die \"Pünt\" ist die kleine Insel in der Eulach, auf der der Sommergarten liegt. Zählt die Geländerstäbe oder Bogenfelder der Brücke, die auf die Insel führt, und wandelt die Zahl als Binärzahl (8-4-2-1) in eine Dezimalzahl um.",
      hint: "Zählt am besten zu zweit — einmal hin, einmal zurück — und vergleicht eure Ergebnisse."
    },
    {
      name: "Sulzerareal / Katharina-Sulzer-Platz",
      meta: "Parkplatz · 4.4 (18)",
      badge: "Recherche",
      task: "Der Platz ist nach Katharina Sulzer benannt. Die Firma Gebrüder Sulzer wurde 1834 in Winterthur gegründet. Sucht die Infotafel zur Geschichte des Sulzerareals auf dem Platz und bildet aus der dort genannten Gründungsjahreszahl die Quersumme. Rechnet das Ergebnis per Modulo-Tabelle in einen Buchstaben um.",
      hint: "1+8+3+4 ist nicht die gesuchte Quersumme — schaut, welche Jahreszahl wirklich auf der Tafel steht."
    },
    {
      name: "Kino Cameo",
      meta: "Kino · 4.8 (142)",
      badge: "Kombination",
      task: "Das Kino Cameo eröffnete im Herbst 2015 in einer ehemaligen Sulzer-Lagerhalle und trägt die Adresse Lagerplatz 19. Kombiniert die Hausnummer mit dem Eröffnungsjahr gemäss Anleitung auf dem Laufzettel zu einem Buchstaben.",
      hint: "Die Hausnummer steht direkt über dem Eingang, das Eröffnungsjahr auf der Tafel \"Über das Kino\"."
    },
    {
      name: "Krahnenhäuschen",
      meta: "Spielplatz · 5.0 (1)",
      badge: "Pseudocode",
      task: "Am Klettergerüst beim Krahnenhäuschen hängen fünf Pseudocode-Karten mit einzelnen Programmierschritten. Bringt sie in die richtige, ausführbare Reihenfolge.",
      hint: "Was zuerst passieren muss, damit der Rest überhaupt funktioniert, kommt zuerst."
    },
    {
      name: "Lagerplatz",
      meta: "Route",
      badge: "Morsecode",
      task: "Direkt am Gleis steht ein alter Bahnwagen der Uetlibergbahn von 1923, der heute als Café dient. Am Wagen hängt ein Morsecode-Schild — entschlüsselt es.",
      hint: "Kurz = Punkt, lang = Strich. Zählt die Zeichen genau ab, bevor ihr in der Morsetabelle nachschaut."
    },
    {
      name: "Rosen Restaurant Lagerplatz",
      meta: "Türkisches Restaurant · 4.5 (119)",
      badge: "Recherche",
      task: "Seit 2009 gehört das Lagerplatz-Areal der Stiftung Abendrot, die es von Sulzer Immobilien und der Post übernommen hat. Findet heraus (Infotafel oder lagerplatz.ch), in welchem Monat und Jahr die \"Zukunftskonferenz\" mit der Mieterschaft stattfand, und leitet daraus euren Buchstaben ab.",
      hint: "Die Konferenz fand nur wenige Monate nach der Übernahme im Jahr 2009 statt."
    },
    {
      name: "Lokstadt",
      meta: "Wohnquartier · 4.0 (25)",
      badge: "Wortspiel",
      task: "Die Neubauten der Lokstadt tragen Tiernamen wie Elefant, Krokodil, Tigerli oder Bigboy. Sucht auf dem Dialogplatz die Namensschilder von mindestens drei dieser Gebäude und findet heraus, welcher Anfangsbuchstabe darin am häufigsten vorkommt.",
      hint: "Auch der Zug-Übername \"Bigboy\" (nach der stärksten Dampflok der Union Pacific) zählt mit."
    },
    {
      name: "Brühlgut Park",
      meta: "Park · 4.2 (102)",
      badge: "Zählaufgabe",
      task: "Das Brühlgut war eines der wenigen Landgüter, die vor 1798 in diesem sonst rein landwirtschaftlich genutzten Gebiet gebaut werden durften. Zählt im Park eine bestimmte Baumart rund um das Gutshaus (z. B. Magnolien) und rechnet die Anzahl in einen Buchstaben um.",
      hint: "Gleiche Umrechnungstabelle wie bei Station 2."
    },
    {
      name: "Frohbergpark",
      meta: "Park · 4.1 (15)",
      badge: "Panorama",
      task: "Der Frohbergpark liegt erhöht über der Altstadt. Stellt euch an den Aussichtspunkt und zählt gemeinsam, wie viele Kirchtürme ihr über den Dächern von Winterthur erkennen könnt.",
      hint: "Dreht euch einmal ganz um die eigene Achse, bevor ihr fertig zählt — von einer Seite sieht man nicht alle."
    },
    {
      name: "Restaurant Pionier",
      meta: "Restaurant · 4.1 (90)",
      badge: "Zahlenschloss",
      task: "Kombiniert auf der Terrasse ein Zahlenschloss bzw. einen Code aus den Zahlenwerten, die ihr bei den bisherigen neun Stationen ermittelt habt.",
      hint: "Die Reihenfolge der bisherigen Zahlenwerte ergibt den Code — schreibt sie am besten unterwegs mit."
    }
  ];

  // Kein Lösungsbuchstabe steckt in den Stationsdaten — die Buchstaben
  // werden ausschliesslich vor Ort gefunden und ganz am Schluss eingegeben.
  const solved = new Array(stations.length).fill(false);
  let current = 0;

  function toBinary4(n){
    return n.toString(2).padStart(4, "0");
  }

  function renderLetters(){
    const el = document.getElementById("letters");
    el.innerHTML = "";
    const doneCount = solved.filter(Boolean).length;
    for(let i = 0; i < SOLUTION.length; i++){
      const slot = document.createElement("div");
      slot.className = "letter-slot" + (solved[i] ? " lit" : "");
      slot.textContent = solved[i] ? "●" : "·";
      el.appendChild(slot);
    }
    document.getElementById("progressCount").textContent = doneCount + " / " + stations.length;
  }

  function renderStationCard(i){
    const s = stations[i];
    const num = i + 1;
    const bin = toBinary4(num);
    const holes = bin.split("").map(b => `<span class="hole${b === "1" ? " on" : ""}"></span>`).join("");
    const isLast = num === stations.length;

    const card = document.createElement("article");
    card.className = "card";
    card.id = "card-" + num;

    card.innerHTML = `
      <div class="card-top">
        <div>
          <div class="card-num">Station ${num} / ${stations.length}</div>
          <h3>${s.name}</h3>
          <div class="meta">${s.meta}</div>
          <div class="hole-row">${holes}<span class="bin-label">${bin}₂</span></div>
        </div>
        <span class="badge">${s.badge}</span>
      </div>
      <div class="task">${s.task}</div>
      <button class="hint-toggle">Hinweis anzeigen</button>
      <div class="hint-box" id="hint-${i}">${s.hint}</div>
      <div class="card-actions">
        <div class="solve-control">
          <button class="solve-btn">${isLast ? "Letzte Station geschafft" : "Station geschafft — nächste freischalten"}</button>
        </div>
      </div>
    `;

    document.getElementById("stations").appendChild(card);

    card.querySelector(".hint-toggle").addEventListener("click", (e) => {
      const box = document.getElementById("hint-" + i);
      const open = box.classList.toggle("open");
      e.target.textContent = open ? "Hinweis verbergen" : "Hinweis anzeigen";
    });

    card.querySelector(".solve-btn").addEventListener("click", () => completeStation(i));
  }

  function completeStation(i){
    if(solved[i]) return;
    solved[i] = true;
    current = i + 1;

    const oldCard = document.getElementById("card-" + (i + 1));
    if(oldCard) oldCard.remove();

    renderTrail();
    renderLetters();

    if(current < stations.length){
      renderStationCard(current);
      document.getElementById("card-" + (current + 1)).scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const finale = document.getElementById("finale");
      finale.hidden = false;
      finale.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderTrail(){
    const trail = document.getElementById("trail");
    trail.innerHTML = "";
    stations.forEach((s, i) => {
      if(!solved[i]) return;
      const item = document.createElement("div");
      item.className = "trail-item";
      item.innerHTML = `<span class="tick">&#10003;</span><span class="tnum">Station ${i + 1}</span><span>${s.name} — geschafft</span>`;
      trail.appendChild(item);
    });
  }

  function renderCheckRow(){
    const row = document.getElementById("checkRow");
    const inputs = [];
    for(let i = 0; i < SOLUTION.length; i++){
      const inp = document.createElement("input");
      inp.className = "check-input";
      inp.maxLength = 1;
      inp.setAttribute("aria-label", "Buchstabe " + (i + 1));
      inputs.push(inp);
      row.appendChild(inp);
    }
    inputs.forEach((inp, idx) => {
      inp.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
        if(e.target.value && inputs[idx + 1]){
          inputs[idx + 1].focus();
        }
      });
      inp.addEventListener("keydown", (e) => {
        if(e.key === "Backspace" && !inp.value && inputs[idx - 1]){
          inputs[idx - 1].focus();
        }
      });
    });
  }

  document.getElementById("checkBtn").addEventListener("click", () => {
    const inputs = document.querySelectorAll(".check-input");
    const guess = Array.from(inputs).map(i => i.value || "").join("");
    const result = document.getElementById("result");

    if(guess.length < SOLUTION.length){
      result.textContent = "Noch nicht alle Felder ausgefüllt.";
      result.className = "result err";
      return;
    }

    if(guess === SOLUTION){
      result.textContent = "";
      document.getElementById("finaleCard").hidden = true;
      document.getElementById("successCard").hidden = false;
    } else {
      result.textContent = "Noch nicht ganz richtig — prüft eure Buchstaben nochmal.";
      result.className = "result err";
    }
  });

  renderLetters();
  renderStationCard(current);
  renderCheckRow();
