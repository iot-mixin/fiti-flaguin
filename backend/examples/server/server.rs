//! Main library entry point for openapi_client implementation.

#![allow(unused_imports)]

use async_trait::async_trait;
use futures::{future, Stream, StreamExt, TryFutureExt, TryStreamExt};
use hyper::server::conn::Http;
use hyper::service::Service;
use log::info;
use std::future::Future;
use std::marker::PhantomData;
use std::net::SocketAddr;
use std::sync::{Arc, Mutex};
use std::task::{Context, Poll};
use swagger::{Has, XSpanIdString};
use swagger::auth::MakeAllowAllAuthenticator;
use swagger::EmptyContext;
use tokio::net::TcpListener;

#[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "ios")))]
use openssl::ssl::{Ssl, SslAcceptor, SslAcceptorBuilder, SslFiletype, SslMethod};

use openapi_client::models;

/// Builds an SSL implementation for Simple HTTPS from some hard-coded file names
pub async fn create(addr: &str, https: bool) {
    let addr = addr.parse().expect("Failed to parse bind address");

    let server = Server::new();

    let service = MakeService::new(server);

    let service = MakeAllowAllAuthenticator::new(service, "cosmo");

    #[allow(unused_mut)]
    let mut service =
        openapi_client::server::context::MakeAddContext::<_, EmptyContext>::new(
            service
        );

    if https {
        #[cfg(any(target_os = "macos", target_os = "windows", target_os = "ios"))]
        {
            unimplemented!("SSL is not implemented for the examples on MacOS, Windows or iOS");
        }

        #[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "ios")))]
        {
            let mut ssl = SslAcceptor::mozilla_intermediate_v5(SslMethod::tls()).expect("Failed to create SSL Acceptor");

            // Server authentication
            ssl.set_private_key_file("examples/server-key.pem", SslFiletype::PEM).expect("Failed to set private key");
            ssl.set_certificate_chain_file("examples/server-chain.pem").expect("Failed to set certificate chain");
            ssl.check_private_key().expect("Failed to check private key");

            let tls_acceptor = ssl.build();
            let tcp_listener = TcpListener::bind(&addr).await.unwrap();

            loop {
                if let Ok((tcp, _)) = tcp_listener.accept().await {
                    let ssl = Ssl::new(tls_acceptor.context()).unwrap();
                    let addr = tcp.peer_addr().expect("Unable to get remote address");
                    let service = service.call(addr);

                    tokio::spawn(async move {
                        let tls = tokio_openssl::SslStream::new(ssl, tcp).map_err(|_| ())?;
                        let service = service.await.map_err(|_| ())?;

                        Http::new()
                            .serve_connection(tls, service)
                            .await
                            .map_err(|_| ())
                    });
                }
            }
        }
    } else {
        // Using HTTP
        hyper::server::Server::bind(&addr).serve(service).await.unwrap()
    }
}

#[derive(Copy, Clone)]
pub struct Server<C> {
    marker: PhantomData<C>,
}

impl<C> Server<C> {
    pub fn new() -> Self {
        Server{marker: PhantomData}
    }
}


use openapi_client::{
    Api,
    CreatePhraseByIdResponse,
    DeletePhraseByIdResponse,
    GetPhraseByIdResponse,
    GetPhrasesResponse,
};
use openapi_client::server::MakeService;
use std::error::Error;
use swagger::ApiError;

#[async_trait]
impl<C> Api<C> for Server<C> where C: Has<XSpanIdString> + Send + Sync
{
    /// Create a phrase with given ID
    async fn create_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        phrase: Option<models::Phrase>,
        context: &C) -> Result<CreatePhraseByIdResponse, ApiError>
    {
        let context = context.clone();
        info!("create_phrase_by_id({:?}, {:?}) - X-Span-ID: {:?}", phrase_id, phrase, context.get().0.clone());
        Err(ApiError("Generic failure".into()))
    }

    /// Delete phrase order by ID
    async fn delete_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        context: &C) -> Result<DeletePhraseByIdResponse, ApiError>
    {
        let context = context.clone();
        info!("delete_phrase_by_id({:?}) - X-Span-ID: {:?}", phrase_id, context.get().0.clone());
        Err(ApiError("Generic failure".into()))
    }

    /// Find phrase order by ID
    async fn get_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        context: &C) -> Result<GetPhraseByIdResponse, ApiError>
    {
        let context = context.clone();
        info!("get_phrase_by_id({:?}) - X-Span-ID: {:?}", phrase_id, context.get().0.clone());
        Err(ApiError("Generic failure".into()))
    }

    /// Returns phrases
    async fn get_phrases(
        &self,
        context: &C) -> Result<GetPhrasesResponse, ApiError>
    {
        let context = context.clone();
        info!("get_phrases() - X-Span-ID: {:?}", context.get().0.clone());
        Err(ApiError("Generic failure".into()))
    }

}
