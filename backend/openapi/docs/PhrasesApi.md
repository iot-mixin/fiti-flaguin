# \PhrasesApi

All URIs are relative to *https://localhost:5000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_phrase_by_id**](PhrasesApi.md#create_phrase_by_id) | **PUT** /phrases/{phraseId} | Create a phrase with given ID
[**delete_phrase_by_id**](PhrasesApi.md#delete_phrase_by_id) | **DELETE** /phrases/{phraseId} | Delete phrase order by ID
[**get_phrase_by_id**](PhrasesApi.md#get_phrase_by_id) | **GET** /phrases/{phraseId} | Find phrase order by ID
[**get_phrases**](PhrasesApi.md#get_phrases) | **GET** /phrases | Returns phrases



## create_phrase_by_id

> crate::models::Phrase create_phrase_by_id(phrase_id, phrase)
Create a phrase with given ID

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**phrase_id** | **uuid::Uuid** | ID of order that needs to be fetched | [required] |
**phrase** | Option<[**Phrase**](Phrase.md)> | Phrase object |  |

### Return type

[**crate::models::Phrase**](Phrase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## delete_phrase_by_id

> delete_phrase_by_id(phrase_id)
Delete phrase order by ID

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**phrase_id** | **uuid::Uuid** | ID of the order that needs to be deleted | [required] |

### Return type

 (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_phrase_by_id

> crate::models::Phrase get_phrase_by_id(phrase_id)
Find phrase order by ID

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**phrase_id** | **uuid::Uuid** | ID of order that needs to be fetched | [required] |

### Return type

[**crate::models::Phrase**](Phrase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_phrases

> Vec<crate::models::Phrase> get_phrases()
Returns phrases

Returns a list of phrases

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<crate::models::Phrase>**](Phrase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

