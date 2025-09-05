"use client";
import React, { useMemo, useRef, useState } from "react";
import { Card } from "./ui/Card";
import { Th, Td } from "./ui/table";
import { Input, NumberInput, Textarea, Select, RadioGroup } from "./ui/forms";
import Graph from "./Graph";

/**
 * FitteiaFormPretty
 * ------------------------------------------------------------
 * A modern, pretty React re-skin of the original HTML form.
 * - TailwindCSS utility classes for styling
 * - Accessible labels
 * - Logical grouping into clean cards
 * - Same fields as the legacy form (no business logic changed)
 * - Safe defaults (won't auto-submit to external CGI unless you enable it)
 *
 * Notes:
 * • Replace placeholder URLs or wire up real submit handlers as needed.
 * • You can split this into smaller components if you prefer.
 */
export default function FitteiaFormPretty() {
  // --- Top bar state (project, file) ---
  const [project, setProject] = useState("Tutorial1");
  const [fileName, setFileName] = useState("file_name");
  const [regex, setRegex] = useState("*");
  const [registro, setRegistro] = useState("Advanced-NMR-1");

  // --- Parameters table (a, b) ---
  type FreeFix = "Free" | "Fixed";
  const [p0FreeFix, setP0FreeFix] = useState<FreeFix>("Fixed");
  const [p1FreeFix, setP1FreeFix] = useState<FreeFix>("Fixed");
  const [p0, setP0] = useState("1.0000e+00");
  const [p1, setP1] = useState("1.0000e+00");
  const [p0min, setP0min] = useState("");
  const [p0max, setP0max] = useState("");
  const [p1min, setP1min] = useState("");
  const [p1max, setP1max] = useState("");

  // --- Data & formulas ---
  const [dadosFontPct, setDadosFontPct] = useState(100);
  const [dados, setDados] = useState(`# Comment lines start with "#"\n# \n# Check Help/FAQ to know how to use \n# special comment lines to do conditional fits/plots \n# \n# Check Help/FAQ to learn how to consider \n# experimental errors in both x and y \n# \n# Fit/Plot commands require data to be formated in \n# three columns: x y ey \n         0.5            1          0.1\n         1.1          2.1          0.1\n         2.1          2.9          0.1\n        3.05          3.1          0.1`);
  const [dataFormulas, setDataFormulas] = useState(`# comment lines start with "#"\n# check the "Calculate How To" link just below\n`);

  // --- Plot parameters ---
  const [autoX, setAutoX] = useState("no");
  const [autoY, setAutoY] = useState("no");
  const [xLabel, setXLabel] = useState("x axis");
  const [yLabel, setYLabel] = useState("y axis");
  const [xmin, setXmin] = useState("0");
  const [xmax, setXmax] = useState("10");
  const [ymin, setYmin] = useState("0");
  const [ymax, setYmax] = useState("10");
  const [xmaj, setXmaj] = useState("1");
  const [ymaj, setYmaj] = useState("1");
  const [xSubticks, setXSubticks] = useState("1");
  const [ySubticks, setYSubticks] = useState("1");
  const [xGrid, setXGrid] = useState("off");
  const [yGrid, setYGrid] = useState("off");
  const [xScale, setXScale] = useState("Normal");
  const [yScale, setYScale] = useState("Normal");
  const [xFormat, setXFormat] = useState("decimal");
  const [yFormat, setYFormat] = useState("decimal");
  const [xPrec, setXPrec] = useState("0");
  const [yPrec, setYPrec] = useState("0");
  const [nTheo, setNTheo] = useState("100");
  const [symbSize, setSymbSize] = useState("1.0");
  const [errBars, setErrBars] = useState("on");
  const [title, setTitle] = useState("");
  const [titlePosX, setTitlePosX] = useState("0.0");
  const [titlePosY, setTitlePosY] = useState("0.0");
  const [plotName, setPlotName] = useState("recta.png");

  // --- Function & parameters ---
  const [xVar, setXVar] = useState("x");
  const [yVar, setYVar] = useState("y");
  const [params, setParams] = useState("a,b");
  const [func, setFunc] = useState("y=a+b*x");
  const [compileStatus, setCompileStatus] = useState<"idle" | "error" | "ok">("error");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const projects = useMemo(
    () => [
      "Tutorial1",
      "Tutorial2",
      "Advanced-NMR-1",
      "Advanced-NMR-two-data-sets",
      "Advanced-Rigid-pendulum-ODE2",
      "Basic-2",
      "Basic-3",
      "Basic-4",
      "Basic-5",
      "Basic-EJP-Damped-oscilator-2013-08-09_19-14-48",
      "Basic-EJP-Damped-oscilator-const-err-2013-08-09_19-14-48",
      "Basic-EJP-Elastic-Constant-2013-08-09_19-15-37",
      "Basic-EJP-Phase-2013-08-09_19-16-56",
      "Basic-EJP-Phase-const-err-2013-08-09_19-16-56",
      "Basic-EJP-x-rays-2013-08-09_19-11-45",
      "Basic-SIRS-Kermach-MacKendrick",
      "Basic-fitif",
      "Basic",
      "Expert-1",
      "Expert-2",
      "Expert-fancy-axis-control (1)",
      "Expert-fancy-axis-control",
      "Expert-spring-mass",
      "Advanced-1",
      "BHelmholtz-2x2cm-2024-10-21_18_05_13",
      "Basic-1",
      "Basic-EJP-Resonance-const-err-2013-08-09_19-13-54",
      "Basic-NMR-1",
      "Basic-NODE1",
      "Basic-ODE2",
      "Basic-predator-prey-infection-x1",
      "Basic-predator-prey-infection-x2",
      "Expert-EJP-5CB_Iso-2013-08-09_19-10-51",
      "Expert-EJP-spring-mass-2013-08-09_19-12-30",
      "Expert-EJP-x-rays-2013-08-09_19-11-45",
      "Expert-NMR-fT",
      "Expert-fancy-N-dimensions",
    ],
    []
  );

  // Handlers (no external POST by default; wire up as needed)
  const onOverwrite = () => console.log("Overwrite", { project, fileName });
  const onArchive = () => console.log("Archive", { project, fileName });
  const onList = () => console.log("List", { regex, registro });
  const onRecover = () => console.log("Recover", { registro });
  const onDownload = () => console.log("Download", { registro });
  const onFit = () => console.log("Fit", collectAll());
  const onPlot = () => console.log("Plot", collectAll());
  const onCalculate = () => console.log("Calculate", { dados, dataFormulas });
  const onDataPlot = () => console.log("Data Plot", { dados });
  const onDataUpload = () => fileInputRef.current?.click();
  const onCompile = () => {
    // Fake compile to mirror the legacy UI state
    // Toggle to demonstrate state changes
    setCompileStatus((s) => (s === "ok" ? "error" : "ok"));
  };

  function collectAll() {
    return {
      top: { project, fileName, regex, registro },
      params: {
        p0: { freeFix: p0FreeFix, value: p0, min: p0min, max: p0max, name: "a" },
        p1: { freeFix: p1FreeFix, value: p1, min: p1min, max: p1max, name: "b" },
      },
      data: { dados, dataFormulas, dadosFontPct },
      plot: {
        autoX,
        autoY,
        xLabel,
        yLabel,
        xmin,
        xmax,
        ymin,
        ymax,
        xmaj,
        ymaj,
        xSubticks,
        ySubticks,
        xGrid,
        yGrid,
        xScale,
        yScale,
        xFormat,
        yFormat,
        xPrec,
        yPrec,
        nTheo,
        symbSize,
        errBars,
        title,
        titlePosX,
        titlePosY,
        plotName,
      },
      func: { xVar, yVar, params, func },
    };
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="https://fitteia-a.vps.tecnico.ulisboa.pt/Pics/fitteia-logo-fitter-1p0_sl.png"
              alt="Fitteia"
              className="h-8 w-auto"
            />
            <div className="ml-2">
              <div className="text-sm font-medium leading-tight">
                joaomnuno@tecnico.ulisboa.pt
              </div>
              <div className="text-xs text-neutral-500">
                HD quota: 1028 kB / 10 MB (10.3%) ·
                <a
                  className="underline decoration-dotted underline-offset-2 ml-1"
                  href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/login?Email=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&Link=59wQhWMzmBuV.850Mou9TI6bK6joe9I9FpCgVDsjoPrZkwsK.DgA&continue=ExpandDir"
                  target="_blank"
                >
                  Clean
                </a>
                <span className="mx-1">·</span>
                <a
                  className="underline decoration-dotted underline-offset-2"
                  href="https://sites.google.com/tecnico.ulisboa.pt/fitteia/support/faq"
                  target="_blank"
                >
                  Need more?
                </a>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2 text-sm">
              <a className="btn-secondary" href="https://sites.google.com/tecnico.ulisboa.pt/fitteia/support" target="_blank">Help</a>
              <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold">Basic</span>
              <a className="btn-secondary" href="?Nome=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&Level=2">Advanced</a>
              <a className="btn-secondary" href="?Nome=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&Level=3">Expert</a>
              <a className="btn-secondary" href="?Nome=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&Level=4">Master</a>
              <a className="btn-secondary" href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/calculator10.cgi?Nome=joaomnuno@tecnico.ulisboa.pt&Numero=59wQhWMzmBuV.850Mou9TI6bK6joe9I9FpCgVDsjoPrZkwsK.DgA&submit=Reload" target="_blank">Calculator</a>
              <a className="btn-secondary" href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/webfplot30.cgi?Nome=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&NC=1&Symbol1=1" target="_blank">Plotter</a>
              <a className="btn-secondary" href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/webreport12.cgi?Nome=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&AddToTextDef=READFROMFILE&Input=&Titulo=file_name&Columns=One%20column&Autores=joaomnuno@tecnico.ulisboa.pt&Affiliation=85.243.99.129&Resumo=Fit%20report%20produced...&Language=english&Watermark=Yes&DocStyle=report&submit=PDFLaTeX" target="_blank">Report</a>
              <a className="btn-secondary" href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/upload2?Nome=joaomnuno@tecnico.ulisboa.pt&Projecto=Tutorial1&Type=fit" target="_blank">Upload</a>
              <a className="btn-secondary" href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/login?Email=joaomnuno@tecnico.ulisboa.pt&Link=59wQhWMzmBuV.850Mou9TI6bK6joe9I9FpCgVDsjoPrZkwsK.DgA&continue=File" target="_blank">MyFits</a>
              <a className="btn-danger" href="https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/login?Email=joaomnuno@tecnico.ulisboa.pt&continue=Logout">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Save / list row */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Save / Archive">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={onOverwrite} className="btn-primary">Overwrite</button>
              <Input label="Project" value={project} onChange={setProject} className="w-40" />
              <Input label="File" value={fileName} onChange={setFileName} className="w-48" />
              <button onClick={onArchive} className="btn-secondary">Archive</button>
            </div>
            <p className="mt-2 text-xs text-neutral-500">/folder_name/<span className="font-mono">{fileName || "file_name"}</span> — avoid spaces & special chars</p>
          </Card>
          <Card title="Browse / Recover">
            <div className="flex flex-wrap items-end gap-2">
              <button onClick={onList} className="btn-secondary">List</button>
              <Input label="RegExp" value={regex} onChange={setRegex} className="w-28" />
              <Select label="Registry" value={registro} onChange={setRegistro} options={projects} />
              <button onClick={onRecover} className="btn-secondary">Recover</button>
              <button onClick={onDownload} className="btn-secondary">Download</button>
            </div>
          </Card>
        </section>

        {/* Plot preview + results */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card title="Preview">
            <div className="aspect-[9/7] w-full overflow-hidden rounded-xl border bg-white">
              <Graph dataStr={dados} xLabel={xLabel} yLabel={yLabel} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {[
                ["fit log", "/home/59.../fit/fit.log"],
                ["fit par", "/home/59.../fit/fit.out"],
                ["pdf", "/home/59.../fit/fit-gph.pdf"],
                ["eps", "/home/59.../fit/fit-gph.eps"],
                ["png", "/home/59.../fit/fit-gph.png"],
                ["agr", "/home/59.../fit/fit-gph.agr"],
                ["curves", "/home/59.../fit/fit-gph"],
                ["residues", "/home/59.../fit/fit-residues.zip"],
                ["par.TeX", "/home/59.../fit/fit-tab.txt"],
                ["data.TeX", "/home/59.../fit/data.tex"],
                ["PDF report", "https://fitteia-a.vps.tecnico.ulisboa.pt/cgi-bin/webreport12.cgi?..."],
              ].map(([label, href]) => (
                <a key={label} className="link" href={href as string} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ))}
            </div>
            <p className="mt-2 text-xs text-neutral-500">(Data plot concluded in 0.52 sec)</p>
          </Card>

          <Card className="lg:col-span-2" title="Fitting Results">
            <div className="text-sm text-neutral-700 mb-3">
              4 experimental points · 0 free parameter ·
              <a className="link ml-1" href="https://sites.google.com/tecnico.ulisboa.pt/fitteia/support" target="_blank" rel="noreferrer">help</a>
            </div>
            <div className="mb-3 text-sm">χ<sup>2</sup> = <span className="font-mono">—</span></div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate [border-spacing:0]"><thead>
                <tr className="bg-neutral-100 text-neutral-700">
                  <Th>Free/Fix</Th>
                  <Th>Name</Th>
                  <Th>Value</Th>
                  <Th>Min</Th>
                  <Th>Max</Th>
                  <Th className="text-left">Error</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-neutral-50">
                  <Td>
                    <RadioGroup
                      name="F0"
                      value={p0FreeFix}
                      onChange={(v) => setP0FreeFix(v as FreeFix)}
                      options={["Free", "Fixed"]}
                    />
                  </Td>
                  <Td className="text-center">a</Td>
                  <Td><Input value={p0} onChange={setP0} /></Td>
                  <Td><Input value={p0min} onChange={setP0min} /></Td>
                  <Td><Input value={p0max} onChange={setP0max} /></Td>
                  <Td />
                </tr>
                <tr className="odd:bg-white even:bg-neutral-50">
                  <Td>
                    <RadioGroup
                      name="F1"
                      value={p1FreeFix}
                      onChange={(v) => setP1FreeFix(v as FreeFix)}
                      options={["Free", "Fixed"]}
                    />
                  </Td>
                  <Td className="text-center">b</Td>
                  <Td><Input value={p1} onChange={setP1} /></Td>
                  <Td><Input value={p1min} onChange={setP1min} /></Td>
                  <Td><Input value={p1max} onChange={setP1max} /></Td>
                  <Td />
                </tr>
              </tbody></table>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={onFit} className="btn-primary">Fit</button>
              <button onClick={onPlot} className="btn-secondary">Plot</button>
            </div>
          </Card>
        </section>

        {/* Data + Plot params */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="1º – Data">
            <div className="flex items-end gap-3">
              <NumberInput label="Font size (%)" value={dadosFontPct} onChange={setDadosFontPct} className="w-36" />
              <a className="link text-sm" href="https://www.themeter.net/mu-so_e.htm" target="_blank" rel="noreferrer">Units&apos; factors</a>
            </div>
            <Textarea
              className="mt-3 font-mono"
              rows={16}
              label=""
              value={dados}
              onChange={setDados}
            />
            <Textarea
              className="mt-3 font-mono"
              rows={4}
              label="Data formulas"
              value={dataFormulas}
              onChange={setDataFormulas}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button onClick={onCalculate} className="btn-secondary">Calculate</button>
              <a className="link text-sm" href="https://sites.google.com/tecnico.ulisboa.pt/fitteia/manual/calculator-toolbox" target="_blank" rel="noreferrer">How To?</a>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button onClick={onDataPlot} className="btn-secondary">Data Plot</button>
              <button onClick={onDataUpload} className="btn-secondary">Data Upload</button>
              <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => console.log("File", e.target.files?.[0])} />
            </div>
          </Card>

          <Card title="2º – Plot Parameters">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select label="Auto scaling (X)" value={autoX} onChange={setAutoX} options={["yes", "no"]} />
              <Select label="Auto scaling (Y)" value={autoY} onChange={setAutoY} options={["yes", "no"]} />
              <Input label="X label" value={xLabel} onChange={setXLabel} />
              <Input label="Y label" value={yLabel} onChange={setYLabel} />
              <Input label="X min" value={xmin} onChange={setXmin} />
              <Input label="Y min" value={ymin} onChange={setYmin} />
              <Input label="X max" value={xmax} onChange={setXmax} />
              <Input label="Y max" value={ymax} onChange={setYmax} />
              <Input label="X increment" value={xmaj} onChange={setXmaj} />
              <Input label="Y increment" value={ymaj} onChange={setYmaj} />
              <Select label="X subticks" value={xSubticks} onChange={setXSubticks} options={["0","1","2","3","4","5","6","7","8","9"]} />
              <Select label="Y subticks" value={ySubticks} onChange={setYSubticks} options={["0","1","2","3","4","5","6","7","8","9"]} />
              <Select label="X grid" value={xGrid} onChange={setXGrid} options={["off","on"]} />
              <Select label="Y grid" value={yGrid} onChange={setYGrid} options={["off","on"]} />
              <Select label="X scale" value={xScale} onChange={setXScale} options={["Normal","Logarithmic"]} />
              <Select label="Y scale" value={yScale} onChange={setYScale} options={["Normal","Logarithmic"]} />
              <Select label="X format" value={xFormat} onChange={setXFormat} options={["decimal","power","scientific"]} />
              <Select label="Y format" value={yFormat} onChange={setYFormat} options={["decimal","power","scientific"]} />
              <Select label="X precision" value={xPrec} onChange={setXPrec} options={["0","1","2","3","4","5","6","7","8","9"]} />
              <Select label="Y precision" value={yPrec} onChange={setYPrec} options={["0","1","2","3","4","5","6","7","8","9"]} />
              <Input label="# pts (theo curves)" value={nTheo} onChange={setNTheo} className="w-36" />
              <Input label="Symbol size" value={symbSize} onChange={setSymbSize} className="w-36" />
              <Select label="Error bars" value={errBars} onChange={setErrBars} options={["on","off"]} />
              <Input label="Title" value={title} onChange={setTitle} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Title pos X" value={titlePosX} onChange={setTitlePosX} />
                <Input label="Title pos Y" value={titlePosY} onChange={setTitlePosY} />
              </div>
              <Input label="Plot name" value={plotName} onChange={setPlotName} />
            </div>
            <div className="mt-2 text-xs text-neutral-500">
              Fonts & typesetting: {" "}
              <a className="link" href="/home/xmgrace-fonts.html" target="_blank" rel="noreferrer">fonts</a>
              {"  ·  "}
              <a className="link" href="https://plasma-gate.weizmann.ac.il/Grace/doc/UsersGuide.html#ss7.1" target="_blank" rel="noreferrer">typesetting</a>
            </div>
          </Card>
        </section>

        {/* Function & parameters */}
        <section>
          <Card title="3º – Function & Parameters">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input label="Independent (x)" value={xVar} onChange={setXVar} />
              <Input label="Dependent (y)" value={yVar} onChange={setYVar} />
              <Input label="Parameters" value={params} onChange={setParams} />
            </div>
            <Textarea
              className="mt-3 font-mono"
              rows={3}
              label="Function (C syntax)"
              value={func}
              onChange={setFunc}
              hint='Use "\\+" to plot contributions separately'
            />
            <div className="mt-3 flex items-center gap-3">
              <button onClick={onCompile} className="btn-primary">Compile</button>
              {compileStatus === "error" ? (
                <div className="text-sm text-red-600">Compilation error. Check <a className="link" href="/home/59.../fit/compile.log" target="_blank">log file</a>.</div>
              ) : (
                <div className="text-sm text-emerald-600">Compilation OK.</div>
              )}
            </div>
          </Card>
        </section>

        <footer className="pt-6 text-sm text-neutral-500">
          <div className="flex items-center gap-3">
            <img src="/Pics/debian-logo.png" alt="Debian" className="h-6" />
            <div>
              Version 61 hosted by <a className="link" href="https://fitteia-a.vps.tecnico.ulisboa.pt/" target="_blank" rel="noreferrer">fitteia-a.vps.tecnico.ulisboa.pt</a>. {" "}
              <a className="link" href="http://sites.google.com/tecnico.ulisboa.pt/fitteia" target="_blank" rel="noreferrer">fitteia</a> is a fitting environment interfaces server for all, under development.
              <div>Webmaster: <a className="link" href="mailto:pedro.jose.sebastiao@ist.utl.pt">Pedro Sebastião</a></div>
            </div>
          </div>
        </footer>
      </main>

      {/* Styles for buttons & cards (Tailwind layer) */}
      <style>{`
        .btn-primary { @apply inline-flex items-center justify-center rounded-xl border border-transparent bg-neutral-900 px-3 py-2 text-white shadow-sm hover:bg-black/90 active:translate-y-px transition; }
        .btn-secondary { @apply inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-700 shadow-sm hover:bg-neutral-50 active:translate-y-px transition; }
        .btn-danger { @apply inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700 shadow-sm hover:bg-red-100 active:translate-y-px transition; }
        .card { @apply rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm; }
        .link { @apply underline underline-offset-2 decoration-neutral-400 hover:decoration-neutral-800; }
        .label { @apply mb-1 block text-xs font-medium text-neutral-600; }
        .input { @apply w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:ring-2 focus:ring-neutral-200; }
        .textarea { @apply w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:ring-2 focus:ring-neutral-200; }
        .select { @apply w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:ring-2 focus:ring-neutral-200; }
        table th, table td { @apply px-3 py-2; }
      `}</style>
    </div>
  );
}

