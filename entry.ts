import pdfjs, {PDFPageProxy} from 'pdfjs-dist';
import pdfInBase64 from './pdfInBase64';

function renderPage(page: PDFPageProxy) {
  const scale = 1.5;
  const viewport = page.getViewport(scale);

  const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  page.render(renderContext);
}


async function loadPdf() {
  const pdfData = Uint8Array.from(atob(pdfInBase64), c => c.charCodeAt(0));
  const pdf = await pdfjs.getDocument({data: pdfData}).promise
  const page = await pdf.getPage(1)
  renderPage(page);
}

loadPdf();
