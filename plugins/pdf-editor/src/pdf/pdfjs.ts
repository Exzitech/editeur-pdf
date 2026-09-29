// Configuration centralisee de pdf.js (rendu / affichage).
// Le worker est embarque en texte puis lance depuis un Blob : le plugin tient
// ainsi dans un seul fichier, sans chemin de worker a resoudre depuis le hub.
import * as pdfjsLib from 'pdfjs-dist';
import workerSource from 'pdfjs-dist/build/pdf.worker.min.mjs?raw';

const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(workerUrl, { type: 'module' });

export { pdfjsLib };
export type PdfDocument = Awaited<ReturnType<typeof pdfjsLib.getDocument>['promise']>;
export type PdfPage = Awaited<ReturnType<PdfDocument['getPage']>>;

/** Charge un document PDF a partir d'un ArrayBuffer (fichier local). */
export async function loadPdfDocument(data: ArrayBuffer): Promise<PdfDocument> {
  // On copie le buffer : pdf.js peut le « detacher », or on en a besoin
  // intact plus tard pour l'export avec pdf-lib.
  const copy = data.slice(0);
  const task = pdfjsLib.getDocument({ data: copy });
  return task.promise;
}
