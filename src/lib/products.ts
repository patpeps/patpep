export type Category = "metabolic" | "recovery" | "longevity" | "cognitive";

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  size: string;
  purity: string;
  cas: string;
  sequence: string;
  molecularWeight: string;
  description: string;
  research: string[];
  storage: string;
  inStock: boolean;
  featured?: boolean;
};

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "metabolic", label: "Metabolic", blurb: "Glucose regulation and body-composition research" },
  { id: "recovery", label: "Recovery", blurb: "Tissue repair and inflammation models" },
  { id: "longevity", label: "Longevity", blurb: "Cellular senescence and mitochondrial studies" },
  { id: "cognitive", label: "Cognitive", blurb: "Neuroprotection and synaptic signaling" },
];

export const products: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    subtitle: "Body Protection Compound",
    category: "recovery",
    price: 54,
    size: "5 mg",
    purity: "≥99.1%",
    cas: "137525-51-0",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    molecularWeight: "1419.53 g/mol",
    description:
      "A synthetic pentadecapeptide derived from a protein found in gastric juice. Widely referenced in preclinical models of soft-tissue and gastrointestinal repair.",
    research: [
      "Tendon and ligament fibroblast migration assays",
      "Gastrointestinal mucosal integrity models",
      "Angiogenesis and VEGF pathway studies",
    ],
    storage: "Lyophilized at -20 °C, protected from light. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
    featured: true,
  },
  {
    slug: "tb-500",
    name: "TB-500",
    subtitle: "Thymosin Beta-4 Fragment",
    category: "recovery",
    price: 62,
    size: "5 mg",
    purity: "≥99.0%",
    cas: "885340-08-9",
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr",
    molecularWeight: "4963.4 g/mol",
    description:
      "The active fragment of Thymosin Beta-4, a G-actin sequestering peptide studied for its role in cell migration and extracellular matrix remodeling.",
    research: [
      "Actin polymerization and cytoskeletal dynamics",
      "Cardiac and dermal wound-healing models",
      "Endothelial cell differentiation assays",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
    featured: true,
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    subtitle: "GLP-1 Receptor Agonist",
    category: "metabolic",
    price: 189,
    size: "5 mg",
    purity: "≥99.4%",
    cas: "910463-68-2",
    sequence: "Modified GLP-1 (7-37) analog with C18 diacid side chain",
    molecularWeight: "4113.58 g/mol",
    description:
      "A long-acting GLP-1 analog with an albumin-binding fatty acid chain, extensively referenced in incretin signaling and energy-balance literature.",
    research: [
      "Incretin receptor binding and cAMP signaling",
      "Rodent glucose tolerance models",
      "Gastric emptying and satiety pathway studies",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 28 days.",
    inStock: true,
    featured: true,
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    subtitle: "Dual GIP / GLP-1 Agonist",
    category: "metabolic",
    price: 229,
    size: "5 mg",
    purity: "≥99.2%",
    cas: "2023788-19-2",
    sequence: "39-amino-acid synthetic analog with C20 diacid moiety",
    molecularWeight: "4813.5 g/mol",
    description:
      "A dual incretin receptor agonist used in comparative studies of GIP and GLP-1 receptor co-activation.",
    research: [
      "Dual receptor occupancy and selectivity assays",
      "Adipose tissue lipolysis models",
      "Comparative incretin pharmacology",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 28 days.",
    inStock: true,
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    subtitle: "Selective GHRP",
    category: "longevity",
    price: 48,
    size: "5 mg",
    purity: "≥99.3%",
    cas: "170851-70-4",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    molecularWeight: "711.85 g/mol",
    description:
      "A pentapeptide ghrelin receptor agonist noted in the literature for its selectivity relative to earlier growth hormone secretagogues.",
    research: [
      "GHS-R1a receptor selectivity studies",
      "Pituitary somatotroph secretion assays",
      "Bone density models in rodents",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
  },
  {
    slug: "cjc-1295-dac",
    name: "CJC-1295 DAC",
    subtitle: "GHRH Analog",
    category: "longevity",
    price: 72,
    size: "5 mg",
    purity: "≥98.9%",
    cas: "863288-34-0",
    sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
    molecularWeight: "3647.2 g/mol",
    description:
      "A GHRH analog bearing a Drug Affinity Complex that extends plasma half-life in preclinical pharmacokinetic work.",
    research: [
      "GHRH receptor pharmacokinetics",
      "Pulsatile secretion modeling",
      "Albumin-binding half-life extension studies",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: false,
  },
  {
    slug: "epitalon",
    name: "Epitalon",
    subtitle: "Telomerase Research Tetrapeptide",
    category: "longevity",
    price: 44,
    size: "10 mg",
    purity: "≥99.0%",
    cas: "307297-39-8",
    sequence: "Ala-Glu-Asp-Gly",
    molecularWeight: "390.35 g/mol",
    description:
      "A short synthetic tetrapeptide studied in the context of pineal regulation and telomerase expression in cell culture.",
    research: [
      "Telomerase activity in somatic cell lines",
      "Circadian and melatonin rhythm models",
      "Oxidative stress marker assays",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
  },
  {
    slug: "semax",
    name: "Semax",
    subtitle: "ACTH (4-10) Analog",
    category: "cognitive",
    price: 58,
    size: "10 mg",
    purity: "≥99.1%",
    cas: "80714-61-0",
    sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
    molecularWeight: "813.9 g/mol",
    description:
      "A heptapeptide ACTH fragment analog referenced in neurotrophic factor expression and cerebral ischemia literature.",
    research: [
      "BDNF and NGF expression assays",
      "Rodent ischemia-reperfusion models",
      "Dopaminergic and serotonergic modulation",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
  },
  {
    slug: "selank",
    name: "Selank",
    subtitle: "Tuftsin Analog",
    category: "cognitive",
    price: 56,
    size: "10 mg",
    purity: "≥98.8%",
    cas: "129954-34-3",
    sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    molecularWeight: "751.9 g/mol",
    description:
      "A synthetic analog of the immunomodulatory peptide tuftsin, studied in anxiolytic and GABAergic signaling models.",
    research: [
      "GABA-A receptor expression studies",
      "Elevated plus-maze behavioral models",
      "Enkephalin degradation inhibition",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    subtitle: "Copper Tripeptide-1",
    category: "recovery",
    price: 66,
    size: "50 mg",
    purity: "≥99.5%",
    cas: "89030-95-5",
    sequence: "Gly-His-Lys · Cu(II)",
    molecularWeight: "403.9 g/mol",
    description:
      "A naturally occurring copper-binding tripeptide widely used in dermal matrix and gene-expression research.",
    research: [
      "Collagen and glycosaminoglycan synthesis",
      "Gene expression profiling in fibroblasts",
      "Antioxidant and metalloproteinase assays",
    ],
    storage: "Lyophilized at -20 °C, protected from light. Reconstituted: 2–8 °C, use within 30 days.",
    inStock: true,
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    subtitle: "Triple Agonist (GIP/GLP-1/GCG)",
    category: "metabolic",
    price: 279,
    size: "5 mg",
    purity: "≥99.0%",
    cas: "2381089-83-2",
    sequence: "Synthetic 39-residue triple incretin agonist",
    molecularWeight: "4731.3 g/mol",
    description:
      "A triple receptor agonist studied for combined GIP, GLP-1, and glucagon receptor activation in metabolic models.",
    research: [
      "Multi-receptor signaling bias studies",
      "Energy expenditure models",
      "Hepatic lipid metabolism assays",
    ],
    storage: "Lyophilized at -20 °C. Reconstituted: 2–8 °C, use within 28 days.",
    inStock: true,
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    subtitle: "Nicotinamide Adenine Dinucleotide",
    category: "longevity",
    price: 89,
    size: "500 mg",
    purity: "≥99.6%",
    cas: "53-84-9",
    sequence: "Dinucleotide coenzyme (reference standard)",
    molecularWeight: "663.43 g/mol",
    description:
      "A core redox coenzyme supplied as a reference standard for mitochondrial and sirtuin-pathway research.",
    research: [
      "Sirtuin enzymatic activity assays",
      "Mitochondrial respiration measurements",
      "PARP-mediated DNA repair models",
    ],
    storage: "Lyophilized at -20 °C, desiccated. Reconstituted: 2–8 °C, use within 14 days.",
    inStock: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}
