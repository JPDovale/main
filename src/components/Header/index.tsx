import { Root } from './Root'
import { EmptySpace } from './EmptySpace'
import { Content } from './Content'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <>
      <Root>
        <Content>
          <Logo />

          <Navigation />
        </Content>
      </Root>
      <EmptySpace />
    </>
  )
}
