import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavBar from '../Containers/NavBarContainer'
import config from '../Config'
import { Container, Grid, Header, Icon, Button } from 'semantic-ui-react'

class NetworkErrorView extends React.Component {
  render () {
    return (
      <div className='page-network-erro'>
        <NavBar />
        <Container>
          <Grid doubling centered>
            <Grid.Column textAlign='center' mobile={16} tablet={8} computer={6}>
              <section>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='warning circle' circular />
                  <Header.Content>Nerwork Error</Header.Content>
                </Header>
                <p>
                  <b>The server cannot process your request.</b><br />
                  The server may be down or you don't have an active internet connection
                </p>
                <div>
                  <a href={config.basePath}>
                    <Button>Retry</Button>
                  </a>
                </div>
              </section>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

NetworkErrorView.propTypes = {}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkErrorView)
