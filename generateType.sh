#!/bin/bash
URL=https://pmapgccqxtkgrvszexlh.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzczNTc1NiwiZXhwIjoxOTUzMzExNzU2fQ.9iNr2BbEhue2tzme5oLGYU9g1JfjmMeC-EeDqWMQH4Q
npx openapi-typescript $URL --output src/utils/generated.ts