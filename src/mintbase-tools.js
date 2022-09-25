import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';

const url = 'https://interop-testnet.hasura.app/v1/graphql';

const StoreNfts = gql`
query GetStoreNfts( 
   $offset: Int = 0 $condition: mb_views_nft_metadata_unburned_bool_exp ) 
   @cached 
   { mb_views_nft_metadata_unburned( where: $condition 
     offset: $offset order_by: { minted_timestamp: desc } ) 
    { createdAt: minted_timestamp 
      metadata_id
      listed: price 
      media 
      storeId: nft_contract_id 
      metadataId: metadata_id 
      title 
      base_uri 
    } 
   mb_views_nft_metadata_unburned_aggregate(where: $condition) 
   { 
     aggregate { 
       count 
     } 
    } 
  }
`

const v2MarketPlaceGetToken = gql`
query v2MarketPlaceGetToken($id: String) {
 tokenData: mb_views_nft_tokens(where: {metadata_id: {_eq: $id}}) {
    media
    title
    metadata_id
    nft_contract_id
    token_id
    listings {
      price
      token_id
    }
    listings_aggregate {
      aggregate {
        count
      }
    }
  }
} 
`;


export async function getMintbaseInfo() {
  const nfts = await axios.post(url, {
    query: print(StoreNfts),
    variables: {
      "condition": {
        "nft_contract_id": { "_eq": "bodegacats.mintspace2.testnet" }
      }
    }
  });
  console.log("nfts", nfts.data);
  const tokenData = await Promise.all(nfts.data.data.mb_views_nft_metadata_unburned.map(async (data) => {
    const nftDetails = await axios.post(url, {
      query: print(v2MarketPlaceGetToken),
      variables: {
        "id": data.metadataId
      }
    });
    const meta = nftDetails.data.data.tokenData[0];
    return {
      url: `https://testnet.mintbase.io/contract/bodegacats.mintspace2.testnet/token/${meta.token_id}`,
      meta: meta
    };
  }));
  return tokenData;
}