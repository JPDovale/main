import { FallingLetters } from '@/components/FallingLetters'
import { Header } from '@/components/Header'
import { MainProjects } from '@/components/MainProjects'
import { Presentation } from '@/components/Presentation'

export default function Home() {
  return (
    <main>
      <Header />
      <FallingLetters />
      <Presentation />

      <MainProjects />
    </main>
  )
}
