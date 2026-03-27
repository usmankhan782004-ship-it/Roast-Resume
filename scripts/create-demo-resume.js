const {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
} = require("docx");
const fs = require("fs");
const path = require("path");

const doc = new Document({
  sections: [
    {
      children: [
        // Name / Header
        new Paragraph({
          text: "JOHN SMITH",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun("john.smith@gmail.com | LinkedIn: linkedin.com/in/johnsmith | Phone: 555-0100"),
          ],
        }),
        new Paragraph({ text: "" }),

        // Objective
        new Paragraph({ text: "OBJECTIVE", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun(
              "To obtain a challenging position in a fast-paced organization where I can utilize my skills and grow professionally."
            ),
          ],
        }),
        new Paragraph({ text: "" }),

        // Skills
        new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("• Microsoft Office (Word, Excel, PowerPoint)")] }),
        new Paragraph({ children: [new TextRun("• Communication skills")] }),
        new Paragraph({ children: [new TextRun("• Team player")] }),
        new Paragraph({ children: [new TextRun("• Detail-oriented")] }),
        new Paragraph({ children: [new TextRun("• Fast learner")] }),
        new Paragraph({ text: "" }),

        // Experience
        new Paragraph({ text: "WORK EXPERIENCE", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun({ text: "Junior Marketing Coordinator", bold: true })],
        }),
        new Paragraph({
          children: [new TextRun("XYZ Corp | June 2022 – Present")],
        }),
        new Paragraph({ children: [new TextRun("• Assisted with marketing campaigns")] }),
        new Paragraph({ children: [new TextRun("• Worked with cross-functional teams")] }),
        new Paragraph({ children: [new TextRun("• Helped create content for social media")] }),
        new Paragraph({ children: [new TextRun("• Attended weekly meetings and took notes")] }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [new TextRun({ text: "Intern", bold: true })],
        }),
        new Paragraph({
          children: [new TextRun("ABC Company | Jan 2022 – May 2022")],
        }),
        new Paragraph({ children: [new TextRun("• Performed various administrative tasks")] }),
        new Paragraph({ children: [new TextRun("• Assisted senior staff with day-to-day operations")] }),
        new Paragraph({ text: "" }),

        // Education
        new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun({ text: "Bachelor of Business Administration", bold: true })],
        }),
        new Paragraph({ children: [new TextRun("State University | Graduated May 2022")] }),
        new Paragraph({ children: [new TextRun("GPA: 3.1 / 4.0")] }),
        new Paragraph({ text: "" }),

        // References
        new Paragraph({ text: "REFERENCES", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("Available upon request.")] }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const outPath = path.join(__dirname, "..", "public", "demo-resume.docx");
  fs.mkdirSync(path.join(__dirname, "..", "public"), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  console.log("✅ Demo resume created at public/demo-resume.docx");
});
