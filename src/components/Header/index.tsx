import { Root } from './Root'
import { EmptySpace } from './EmptySpace'
import { Content } from './Content'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { NavigationDropdown } from './NavigationDropdown'

export function Header() {
  return (
    <>
      <Root>
        <Content>
          <Logo />

          <Navigation />
          <NavigationDropdown />
        </Content>
      </Root>
      <EmptySpace />
    </>
  )
}
