// src/data/products.ts
import imgSevilla    from "../assets/images/sevilla.webp";
import imgGranada    from "../assets/images/granada.webp";
import imgValencia   from "../assets/images/valencia.webp";
import imgBilbao     from "../assets/images/bilbao.webp";
import imgMalaga     from "../assets/images/malaga.webp";
import imgBogota     from "../assets/images/bogota.webp";
import imgMedellin   from "../assets/images/medellin.webp";
import imgCartagena  from "../assets/images/cartagena.webp";
import imgToscana    from "../assets/images/toscana.webp";
import imgSiena      from "../assets/images/siena.webp";
import imgVerona     from "../assets/images/verona.webp";
import imgCusco      from "../assets/images/cusco.webp";

export type Product = {
  id: string;
  name: string;
  size: string;       // "60×60"
  finish: string;     // "Mate antideslizante"
  img: string;        // import resuelto por Vite
  category?: string;  // "Porcelanato" | "Cerámica" | "Exterior" | "Decorativo" | "Mosaico"
};

export const PRODUCTS: Product[] = [
  // PORCELANATO
  { id: "p1",  name: "Sevilla",   size: "60×60",  finish: "Mate",                category: "Porcelanato", img: imgSevilla },
  { id: "p2",  name: "Granada",   size: "60×120", finish: "Brillante",           category: "Porcelanato", img: imgGranada },
  { id: "p3",  name: "Valencia",  size: "45×90",  finish: "Satinado",            category: "Porcelanato", img: imgValencia },
  { id: "p4",  name: "Bilbao",    size: "30×60",  finish: "Texturizado",         category: "Porcelanato", img: imgBilbao },
  { id: "p5",  name: "Cusco",     size: "30×60",  finish: "Mate Antideslizante", category: "Porcelanato", img: imgCusco },

  // CERÁMICA
  { id: "p6",  name: "Bogotá",    size: "30×60",  finish: "Brillante",           category: "Cerámica",    img: imgBogota },
  { id: "p7",  name: "Medellín",  size: "45×45",  finish: "Mate",                category: "Cerámica",    img: imgMedellin },
  { id: "p8",  name: "Málaga",    size: "10×30",  finish: "Brillante",           category: "Cerámica",    img: imgMalaga },
  { id: "p9",  name: "Cartagena", size: "20×20",  finish: "Hidráulico",          category: "Decorativo",  img: imgCartagena },

  // EXTERIOR / PIEDRA
  { id: "p10", name: "Toscana",   size: "60×60",  finish: "Piedra",              category: "Exterior",    img: imgToscana },
  { id: "p11", name: "Siena",     size: "45×45",  finish: "Mate",                category: "Exterior",    img: imgSiena },
  { id: "p12", name: "Verona",    size: "60×60",  finish: "Texturizado",         category: "Exterior",    img: imgVerona }
];
