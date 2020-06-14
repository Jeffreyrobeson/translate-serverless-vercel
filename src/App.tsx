import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Card,
  Fade,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { LoadingComponent } from './common/loading/Loading.Loading.component'

const useStyles = makeStyles({
  root: {
    margin: '2rem 0',
    maxWidth: '100%',
  },
  container: {
    padding: 0,
  },
  media: {
    height: '100%',
  },
})

const healthDict: Record<number, any> = {
  200: {
    text: 'running',
  },
  500: {
    text: 'broken',
  },
  0: {
    text: 'broken...',
  },
}

function App(): JSX.Element {
  const [healthResponse, setHealthResponse] = useState<any>(null)
  useEffect(() => {
    async function getHealthStatus() {
      axios
        .post('/api/translate', { message: 'Translate me now!', from: 'en', to: 'pt' })
        .then((response) => {
          setHealthResponse(response)
        })
        .catch((error) => {
          const errorResponse = error?.response || { response: { status: 500 } }
          setHealthResponse(errorResponse)
        })
    }
    getHealthStatus()
  }, [setHealthResponse])

  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Grid container justify="center" alignItems="center" direction="column">
        {healthResponse === null && <LoadingComponent />}
        <Fade in={healthResponse !== null} timeout={500}>
          <Card className={classes.root}>
            <CardMedia
              component="img"
              className={classes.media}
              image={`https://http.cat/${healthResponse?.status}`}
              title="Current API Status"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Translate Serverless Now
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                Serverless Translation API using Vercel's new API
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                The project is currently:{' '}
                {healthDict[healthResponse?.status] ? healthDict[healthResponse.status].text : healthDict[0].text}
              </Typography>
              {healthResponse?.statusText && (
                <Typography variant="body2" component="p" color="textSecondary">
                  Status Text: {healthResponse?.statusText}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Tooltip title="Readme!" placement="top-end">
                <IconButton
                  href="https://github.com/olavoparno/translate-serverless-now/blob/master/README.md"
                  aria-label="readme"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Fade>
      </Grid>
    </Container>
  )
}

export default App
