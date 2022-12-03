#![allow(missing_docs, trivial_casts, unused_variables, unused_mut, unused_imports, unused_extern_crates, non_camel_case_types)]
#![allow(unused_imports, unused_attributes)]
#![allow(clippy::derive_partial_eq_without_eq, clippy::blacklisted_name)]

use async_trait::async_trait;
use futures::Stream;
use std::error::Error;
use std::task::{Poll, Context};
use swagger::{ApiError, ContextWrapper};
use serde::{Serialize, Deserialize};

type ServiceError = Box<dyn Error + Send + Sync + 'static>;

pub const BASE_PATH: &str = "/api/v1";
pub const API_VERSION: &str = "0.0.1";

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[must_use]
pub enum CreatePhraseByIdResponse {
    /// successful operation
    SuccessfulOperation
    (models::Phrase)
    ,
    /// Invalid ID supplied
    InvalidIDSupplied
    ,
    /// Order not found
    OrderNotFound
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub enum DeletePhraseByIdResponse {
    /// successful operation
    SuccessfulOperation
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[must_use]
pub enum GetPhraseByIdResponse {
    /// successful operation
    SuccessfulOperation
    (models::Phrase)
    ,
    /// Invalid ID supplied
    InvalidIDSupplied
    ,
    /// Order not found
    OrderNotFound
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub enum GetPhrasesResponse {
    /// successful operation
    SuccessfulOperation
    (Vec<models::Phrase>)
}

/// API
#[async_trait]
#[allow(clippy::too_many_arguments, clippy::ptr_arg)]
pub trait Api<C: Send + Sync> {
    fn poll_ready(&self, _cx: &mut Context) -> Poll<Result<(), Box<dyn Error + Send + Sync + 'static>>> {
        Poll::Ready(Ok(()))
    }

    /// Create a phrase with given ID
    async fn create_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        phrase: Option<models::Phrase>,
        context: &C) -> Result<CreatePhraseByIdResponse, ApiError>;

    /// Delete phrase order by ID
    async fn delete_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        context: &C) -> Result<DeletePhraseByIdResponse, ApiError>;

    /// Find phrase order by ID
    async fn get_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        context: &C) -> Result<GetPhraseByIdResponse, ApiError>;

    /// Returns phrases
    async fn get_phrases(
        &self,
        context: &C) -> Result<GetPhrasesResponse, ApiError>;

}

/// API where `Context` isn't passed on every API call
#[async_trait]
#[allow(clippy::too_many_arguments, clippy::ptr_arg)]
pub trait ApiNoContext<C: Send + Sync> {

    fn poll_ready(&self, _cx: &mut Context) -> Poll<Result<(), Box<dyn Error + Send + Sync + 'static>>>;

    fn context(&self) -> &C;

    /// Create a phrase with given ID
    async fn create_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        phrase: Option<models::Phrase>,
        ) -> Result<CreatePhraseByIdResponse, ApiError>;

    /// Delete phrase order by ID
    async fn delete_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        ) -> Result<DeletePhraseByIdResponse, ApiError>;

    /// Find phrase order by ID
    async fn get_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        ) -> Result<GetPhraseByIdResponse, ApiError>;

    /// Returns phrases
    async fn get_phrases(
        &self,
        ) -> Result<GetPhrasesResponse, ApiError>;

}

/// Trait to extend an API to make it easy to bind it to a context.
pub trait ContextWrapperExt<C: Send + Sync> where Self: Sized
{
    /// Binds this API to a context.
    fn with_context(self, context: C) -> ContextWrapper<Self, C>;
}

impl<T: Api<C> + Send + Sync, C: Clone + Send + Sync> ContextWrapperExt<C> for T {
    fn with_context(self: T, context: C) -> ContextWrapper<T, C> {
         ContextWrapper::<T, C>::new(self, context)
    }
}

#[async_trait]
impl<T: Api<C> + Send + Sync, C: Clone + Send + Sync> ApiNoContext<C> for ContextWrapper<T, C> {
    fn poll_ready(&self, cx: &mut Context) -> Poll<Result<(), ServiceError>> {
        self.api().poll_ready(cx)
    }

    fn context(&self) -> &C {
        ContextWrapper::context(self)
    }

    /// Create a phrase with given ID
    async fn create_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        phrase: Option<models::Phrase>,
        ) -> Result<CreatePhraseByIdResponse, ApiError>
    {
        let context = self.context().clone();
        self.api().create_phrase_by_id(phrase_id, phrase, &context).await
    }

    /// Delete phrase order by ID
    async fn delete_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        ) -> Result<DeletePhraseByIdResponse, ApiError>
    {
        let context = self.context().clone();
        self.api().delete_phrase_by_id(phrase_id, &context).await
    }

    /// Find phrase order by ID
    async fn get_phrase_by_id(
        &self,
        phrase_id: uuid::Uuid,
        ) -> Result<GetPhraseByIdResponse, ApiError>
    {
        let context = self.context().clone();
        self.api().get_phrase_by_id(phrase_id, &context).await
    }

    /// Returns phrases
    async fn get_phrases(
        &self,
        ) -> Result<GetPhrasesResponse, ApiError>
    {
        let context = self.context().clone();
        self.api().get_phrases(&context).await
    }

}


#[cfg(feature = "client")]
pub mod client;

// Re-export Client as a top-level name
#[cfg(feature = "client")]
pub use client::Client;

#[cfg(feature = "server")]
pub mod server;

// Re-export router() as a top-level name
#[cfg(feature = "server")]
pub use self::server::Service;

#[cfg(feature = "server")]
pub mod context;

pub mod models;

#[cfg(any(feature = "client", feature = "server"))]
pub(crate) mod header;
