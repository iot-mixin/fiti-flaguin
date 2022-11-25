# phrases_api

All URIs are relative to *https://localhost:5000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
**createPhraseByID**](phrases_api.md#createPhraseByID) | **PUT** /phrases/{phraseId} | Create a phrase with given ID
**deletePhraseByID**](phrases_api.md#deletePhraseByID) | **DELETE** /phrases/{phraseId} | Delete phrase order by ID
**getPhraseById**](phrases_api.md#getPhraseById) | **GET** /phrases/{phraseId} | Find phrase order by ID
**getPhrases**](phrases_api.md#getPhrases) | **GET** /phrases | Returns phrases


# **createPhraseByID**
> models::Phrase createPhraseByID(ctx, phrase_id, optional)
Create a phrase with given ID

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context containing the authentication | nil if no authentication
  **phrase_id** | [****](.md)| ID of order that needs to be fetched | 
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **phrase_id** | [****](.md)| ID of order that needs to be fetched | 
 **phrase** | [**Phrase**](Phrase.md)| Phrase object | 

### Return type

[**models::Phrase**](Phrase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deletePhraseByID**
> deletePhraseByID(ctx, phrase_id)
Delete phrase order by ID

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context containing the authentication | nil if no authentication
  **phrase_id** | [****](.md)| ID of the order that needs to be deleted | 

### Return type

 (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPhraseById**
> models::Phrase getPhraseById(ctx, phrase_id)
Find phrase order by ID

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context containing the authentication | nil if no authentication
  **phrase_id** | [****](.md)| ID of order that needs to be fetched | 

### Return type

[**models::Phrase**](Phrase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPhrases**
> Vec<models::Phrase> getPhrases(ctx, )
Returns phrases

Returns a list of phrases

### Required Parameters
This endpoint does not need any parameter.

### Return type

[**Vec<models::Phrase>**](Phrase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

