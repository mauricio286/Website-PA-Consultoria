# PA Consultoria CMS — Documentação da API

Backend headless CMS para o site institucional do Grupo PA Consultoria.
Construído com Payload CMS v3, PostgreSQL e Google Cloud Storage.

---

## Como rodar localmente

```bash
# 1. Sobe o banco PostgreSQL via Docker
docker-compose up -d

# 2. Instala dependências
npm install

# 3. Copia e preenche as variáveis de ambiente
cp .env.example .env

# 4. Sobe o CMS em modo dev
npm run dev

# 5. (Opcional) Popula o banco com dados de exemplo
npm run seed
```

O painel admin estará em: http://localhost:3000/admin

---

## Endpoints disponíveis

### Globals (leitura pública)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/globals/home-page` | Todos os textos e imagens da Home |
| GET | `/api/globals/about-page` | Conteúdo da página Quem Somos |
| GET | `/api/globals/contact-settings` | Endereços, telefones e e-mails |
| GET | `/api/globals/site-settings` | Logo, favicon e redes sociais |

### Collections (leitura pública)

| Método | Endpoint | Filtros úteis |
|--------|----------|---------------|
| GET | `/api/services` | `?where[published][equals]=true&sort=order` |
| GET | `/api/services/:id` | — |
| GET | `/api/services` | `?where[slug][equals]=consultoria-agronomica` |
| GET | `/api/jobs` | `?where[status][equals]=open&sort=order` |
| GET | `/api/jobs/:id` | — |
| GET | `/api/partners` | `?where[published][equals]=true&sort=order` |
| GET | `/api/testimonials` | `?where[published][equals]=true&sort=order` |
| GET | `/api/galleries` | `?where[published][equals]=true` |
| GET | `/api/galleries/:id` | — |
| GET | `/api/map-locations` | `?where[published][equals]=true&sort=order` |

### Formulários (endpoints customizados)

#### POST `/api/contact`
Formulário de contato da página Contato.

```json
// Body (application/json)
{
  "name": "João Silva",
  "phone": "(65) 99999-9999",
  "email": "joao@email.com",
  "subject": "Dúvida sobre consultoria",
  "message": "Gostaria de saber mais sobre os serviços..."
}
```

**Resposta de sucesso (200):**
```json
{ "success": true, "message": "Mensagem enviada com sucesso." }
```

---

#### POST `/api/job-applications`
Candidatura a vaga. Enviar como `multipart/form-data` quando houver currículo.

```
jobId       string   (obrigatório) — ID da vaga no Payload
name        string   (obrigatório)
email       string   (obrigatório)
phone       string   (obrigatório)
experience  string   (obrigatório)
cpf         string   (opcional)
rg          string   (opcional)
state       string   (opcional) — UF, 2 caracteres
city        string   (opcional)
education   string   (opcional)
qualifications string (opcional)
resume      File     (opcional)  — PDF, DOC ou DOCX, máx 5 MB
```

**Resposta de sucesso (200):**
```json
{ "success": true, "message": "Candidatura enviada com sucesso." }
```

---

## Formato de resposta das Collections

O Payload retorna as listas neste formato:
```json
{
  "docs": [...],
  "totalDocs": 10,
  "limit": 10,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

Use `response.docs` para acessar os itens.

---

## Rich Text (campos de texto rico)

Campos do tipo `richText` retornam o formato **Lexical JSON** (não HTML).
O dev frontend precisa de um serializer para renderizá-los.

Exemplo de output:
```json
{
  "root": {
    "children": [
      {
        "type": "paragraph",
        "children": [{ "type": "text", "text": "Conteúdo aqui..." }]
      }
    ]
  }
}
```

Pacote recomendado: `@payloadcms/richtext-lexical` (tem componente React e serializer HTML).

---

## Coordenadas do mapa

Os campos `positionX` e `positionY` da collection `map-locations` são **pixels**
relativos ao `viewBox="0 0 1195 1031"` do SVG do mapa, não coordenadas geográficas.

Alterar o arquivo SVG do mapa pode deslocar todos os pins.

---

## Imagens

Todas as imagens retornam como URL absoluta no campo `url`.
Tamanhos disponíveis: `thumbnail` (400×300), `card` (768×512), `hero` (1920×1080).

Exemplo:
```json
{
  "url": "https://storage.googleapis.com/pa-cms-media/uploads/foto.jpg",
  "sizes": {
    "thumbnail": { "url": "...", "width": 400, "height": 300 },
    "card": { "url": "...", "width": 768, "height": 512 },
    "hero": { "url": "...", "width": 1920, "height": 1080 }
  }
}
```
