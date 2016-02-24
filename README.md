# sitemap-system

Generate sitemap index and urlset on simple way :rocket:

## Rules

http://www.sitemaps.org/protocol.html

## Install

```
$ npm install sitemap-system
```

## CI
[![Circle CI](https://circleci.com/gh/LucasRodrigues/sitemap.svg?style=svg)](https://circleci.com/gh/LucasRodrigues/sitemap)

## Input 

### Json properties

#### path
  path where the sitemap content will be saved
#### domain
  your website domain
#### themes
  divisions of your web site
##### name
  name of your theme
##### urls
  list of your urls with format as
  - loc
  
  url
  
  - priority
  
  Scale of priority in your web site.
  Values should be between 0.0 and 1.0
  
  - changeFreq
  
  Information of how often this data is updated

  Accept values:
    - always
    - hourly
    - daily
    - weekly
    - monthly
    - anual 
    - never
  
  - lastmod
  
  Date of last change on format 

### Example
```json
{
  "path":"/Documents/",
  "domain": "http://mywebsite.com",
  "themes":[
  {
    "name":"sport",
    "urls":[
    {
      "loc":"http://mywebsite.com/sport/soccer",
      "priority":0.7,
      "changeFreq":"always",
      "lastMod":"2016-02-01"
    },
    {
      "loc":"http://mywebsite.com/sport/football",
      "priority":0.7,
      "changeFreq":"always",
      "lastMod":"2016-02-01"
    }
    ]
  },
  {
    "name":"culture",
    "urls":[
    {
      "loc":"http://mywebsite.com/culture/book",
      "priority":0.6,
      "changeFreq":"never",
      "lastMod":"2016-02-01"
    },
    {
      "loc":"http://mywebsite.com/culture/movie",
      "priority":0.6,
      "changeFreq":"never",
      "lastMod":"2016-02-01"
    }
    ]
  }
  ]
}
```

## Output

### Folder structure

```
├── sitemap/
│   ├── index_0.xml
│   ├── index_1.xml
│   ├── theme_0
│   │   ├── urlset_0.xml
│   │   ├── urlset_1.xml
│   │   ├── urlset_2.xml
│   ├── theme_1
│   │   ├── urlset_0.xml
```

### Example

Based on configuration [example](https://github.com/LucasRodrigues/sitemap-system#example)

```
├── sitemap/
│   ├── index_0.xml
│   ├── sport
│   │   ├── urlset_0.xml
│   ├── culture
│   │   ├── urlset_0.xml
```
