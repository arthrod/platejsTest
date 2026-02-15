import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { filename, html } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Create temporary directory for processing
    const tempDir = path.join(process.cwd(), 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    // Generate unique filename for temporary HTML file
    const uniqueId = uuidv4();
    const htmlFile = path.join(tempDir, `${uniqueId}.html`);

    let browser;
    try {
      // Write HTML to temporary file
      await fs.writeFile(htmlFile, html, 'utf-8');

      // Launch Puppeteer browser
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
        ],
        headless: true,
      });

      const page = await browser.newPage();

      // Set viewport for consistent rendering
      await page.setViewport({ height: 800, width: 1200 });

      // Load the HTML file
      await page.goto(`file://${htmlFile}`, {
        timeout: 30000,
        waitUntil: 'networkidle0',
      });

      // Generate PDF with text-based output
      const pdfBuffer = await page.pdf({
        displayHeaderFooter: true,
        footerTemplate: `
          <div style="font-size: 10px; color: #666; text-align: center; width: 100%; margin: 0 auto;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `,
        format: 'A4',
        headerTemplate: '<div></div>',
        margin: {
          bottom: '1in',
          left: '1in',
          right: '1in',
          top: '1in',
        },
        preferCSSPageSize: true,
        printBackground: true,
      });

      // Clean up
      await browser.close();
      await fs.unlink(htmlFile).catch(() => {});

      // Return PDF as response
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Disposition': `attachment; filename="${filename || 'document.pdf'}"`,
          'Content-Type': 'application/pdf',
        },
      });
    } catch (error) {
      // Clean up in case of error
      if (browser) {
        await browser.close().catch(() => {});
      }
      await fs.unlink(htmlFile).catch(() => {});
      throw error;
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF using Puppeteer. Please try again.' },
      { status: 500 }
    );
  }
}
