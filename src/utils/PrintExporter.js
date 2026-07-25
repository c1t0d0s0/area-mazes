export class PrintExporter {
  static printPuzzle(model, svgElement) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('ポップアップがブロックされました。印刷するにはポップアップを許可してください。');
      return;
    }

    const svgHtml = svgElement ? svgElement.outerHTML : '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${model.title} - AREA MAZE</title>
          <style>
            @media print {
              body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; color: #000; }
              .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
              .header h1 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0 0; font-size: 14px; color: #555; }
              .diagram { display: flex; justify-content: center; margin: 40px 0; }
              .diagram svg { max-width: 80%; height: auto; border: 2px solid #000; }
              .answer-box { margin-top: 50px; border: 1px dashed #666; padding: 15px; text-align: center; font-size: 18px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${model.title}</h1>
            <p>難易度: ${model.difficulty} | 面積迷路パズル (Area Maze)</p>
          </div>
          <div class="diagram">
            ${svgHtml}
          </div>
          <div class="answer-box">
            答え「 ? 」: ____________
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}
