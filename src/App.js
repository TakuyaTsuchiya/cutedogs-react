import { useEffect, useState } from "react";
import { fetchImages } from "./api";

const Header = () => {
    return (
            <header className="hero is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                <h1 className="title">Cute Dog Images</h1>
                    </div>
                </div>
            </header>
    );
}

const Image = (props) =>  {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image">
                    <img src={props.src} alt="cute dog"/>
                </figure>
            </div>
        </div>
    );
}

const Loading = () => {
    return <p>Now Loading...</p>
}

const Gallery = (props) => {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
        <div className="columns is-vCentered is-multiline">
            {urls.map((url) => {
                return (
                    <div key={url} className="column is-3">
                        <Image src={url}/>
                    </div>
                );
              })}
        </div>
    );
}

const Form = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const {breed} = event.target.elements;
        props.onFormSubmit(breed.value);
        };
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <div className='field has-addons'>
                    <div className='control is-expanded'>
                        <div className='select is-fullwidth'>
                            <select name="breed" defaultValue="shiba">
                                <option value="shiba">Shiba</option>
                                <option value="akita">Akita</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='button is-dark'>
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const Main = () => {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("shiba").then((urls) => {
            setUrls(urls);
    });
}, []);
    const reloadImages = (breed) => {
        fetchImages(breed).then((urls) => {
            setUrls(urls);
        });
    }
    return (
        <main>
            <section className='section'>
                <div className='container'>
                    <Form onFormSubmit={reloadImages} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls={urls}/>
                </div>
            </section>
        </main>
    );
}


const Footer = () => {
    return(
        <footer className="footer">
            <div className="content has-text-centered">
                <p>Dog images are from DOG API</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">Donate to DOG API</a>
                </p>
            </div>
        </footer>
    );
};

export const App = () =>{
    return(
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

