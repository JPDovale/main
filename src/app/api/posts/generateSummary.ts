export function generateSummary(content: string) {
  const lines = content.split('\n')
  const paragraphs = []
  let actualParagraph = ''

  lines.forEach((line) => {
    if (line.trim() === '' && actualParagraph.trim() !== '') {
      paragraphs.push(actualParagraph)
      actualParagraph = ''
    } else {
      actualParagraph += line
    }
  })

  if (actualParagraph.trim() !== '') {
    paragraphs.push(actualParagraph)
  }

  const summary = paragraphs.slice(0, 4).join('\n\n')

  if (summary.length > 600) {
    return summary.slice(0, 600).concat('...')
  }

  return summary
}
