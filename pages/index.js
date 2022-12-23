import Head from 'next/head'
import { Inter } from '@next/font/google'
import Image from 'next/image'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [tweetId, setTweetId] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [err, setErr] = useState(false);
  const [gUsers, setGUsers] = useState([]);
  const [winner, setWinner] = useState(null);

  const pickWinner = async () => {
    setButtonClicked(true);
    setErr(false);
    try {
      const response = await fetch('/api/twitter/retweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tweetId })
      });
      if (response.status !== 200)
        throw new Error('An error occurred');
      const data = await response.json();
      setGUsers(data.allUsers);
      setWinner(data.allUsers[Math.floor(Math.random() * data.allUsers.length)]);
      console.log(data);
    } catch (e) {
      console.error(e);
      setErr(true);
    }
    setButtonClicked(false);
  }

  const reroll = () => {
    setWinner(gUsers[Math.floor(Math.random() * gUsers.length)]);
  }

  return (
    <>
      <Head>
        <title>Twitter RT Picker v1</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className='mx-auto w-100 text-center bg-primary'>
          <h1 className='text-white p-5'>Twitter RT Picker v1</h1>
        </div>
        <Form className='mx-auto px-5 mt-5 container-md'>
          <Form.Group className='mb-3' controlId='tweetId'>
            <Form.Label>Tweet ID</Form.Label>
            <Form.Control type='text' placeholder='Enter tweet ID' value={tweetId} onChange={(e) => { setTweetId(e.target.value) }} />
            {err && <Form.Text className='text-danger'>
              An error occurred. Please try again.
            </Form.Text>}
          </Form.Group>
          {gUsers.length > 0 && <Button variant='primary' onClick={reroll}>Reroll</Button>}
          <Button className={gUsers.length > 0 && 'ms-3'} variant={gUsers.length > 0 ? 'danger' : 'primary'} onClick={pickWinner}>{gUsers.length > 0 ? "Update tweet data" : "Pick a winner!"}</Button>
        </Form>
        {buttonClicked && <div className='mx-auto w-100 text-center mt-5'>
          <Spinner animation='border' variant='primary' />
        </div>}

        {gUsers.length > 0 && <>
          <h2 className='text-primary text-center mt-5'>The winner is...</h2>
          <div className='px-5 mx-auto container-md'>
            <div className='py-3 px-4 mt-2 bg-dark rounded '>
              <div className='d-flex'>
                <Image src={winner.profile_image_url} alt={winner.name} className='rounded-circle' width='100' height='100' />
                <div className='mx-3'>
                  <a href={`https://twitter.com/${winner.username}`} target="_blank" rel="noreferrer" className="text-reset"><h3 className='text-white'>{winner.name}</h3></a>
                  <h4 className='text-white-50'>@{winner.username}</h4>
                </div>
              </div>
            </div>
          </div>
        </>}
      </main>
    </>
  )
}
