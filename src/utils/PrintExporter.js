export class PrintExporter {
  static printPuzzle(model, svgElement) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('ポップアップがブロックされました。印刷するにはポップアップを許可してください。');
      return;
    }

    // Clone the SVG element so we can sanitize or adjust attributes for print if needed
    let svgHtml = '';
    if (svgElement) {
      const clone = svgElement.cloneNode(true);
      // Ensure SVG has explicit dimensions
      clone.setAttribute('width', '550');
      clone.setAttribute('height', '450');
      svgHtml = clone.outerHTML;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <title>${model.title} - 面積迷路 (Area Maze)</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');

            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', sans-serif;
              background-color: #ffffff;
              color: #111827;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }

            .header {
              text-align: center;
              border-bottom: 3px solid #111827;
              padding-bottom: 16px;
              margin-bottom: 30px;
            }
            .header h1 {
              font-family: 'Outfit', sans-serif;
              font-size: 28px;
              color: #111827;
              margin-bottom: 6px;
            }
            .header .meta {
              font-size: 14px;
              color: #4b5563;
              font-weight: 600;
            }

            .diagram-container {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 30px 0;
            }

            /* Print-Optimized High-Contrast SVG Styles */
            .maze-svg {
              background: #ffffff;
            }
            .maze-rect {
              fill: #ffffff !important;
              stroke: #111827 !important;
              stroke-width: 3px !important;
            }
            .maze-rect.question-rect {
              fill: #fef3c7 !important;
              stroke: #d97706 !important;
              stroke-width: 3.5px !important;
              stroke-dasharray: 6 3 !important;
            }
            .area-label {
              font-family: 'Outfit', sans-serif !important;
              font-size: 22px !important;
              font-weight: 700 !important;
              fill: #111827 !important;
            }
            .question-label {
              font-size: 32px !important;
              font-weight: 800 !important;
              fill: #d97706 !important;
            }
            .edge-bg {
              fill: #f3f4f6 !important;
              stroke: #111827 !important;
              stroke-width: 1.5px !important;
            }
            .edge-label {
              font-family: 'JetBrains Mono', monospace !important;
              font-size: 14px !important;
              font-weight: 700 !important;
              fill: #111827 !important;
            }
            .note-label {
              display: none !important; /* Hide scratch notes when printing clean puzzle sheet */
            }

            .answer-section {
              margin-top: 40px;
              border: 2px dashed #374151;
              border-radius: 12px;
              padding: 24px;
              text-align: center;
              background-color: #f9fafb;
            }
            .answer-title {
              font-size: 18px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 8px;
            }
            .answer-line {
              font-family: 'JetBrains Mono', monospace;
              font-size: 24px;
              font-weight: 700;
              color: #111827;
            }

            .footer-info {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
            }

            @media print {
              body { padding: 0; }
              .answer-section { background-color: #ffffff; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${model.title}</h1>
            <div class="meta">難易度: ${model.difficulty} | 面積迷路 (Area Maze)</div>
          </div>

          <div class="diagram-container">
            ${svgHtml}
          </div>

          <div class="answer-section">
            <div class="answer-title">解答記入欄</div>
            <div class="answer-line">答え「 ? 」 =  ________________ cm</div>
          </div>

          <div class="footer-info">
            Area Mazes (面積迷路) | Printed on ${new Date().toLocaleDateString('ja-JP')}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  }
}
