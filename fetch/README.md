# Fetch Hook - Como usar?

Essa implementação trabalha com o conceito de hooks do React além de usar uma abordagem 
clean code com um dos principios do S.O.L.I.D, onde, nesse caso, estamos usando o 
Dependency Inversion Principle.

Quando você for implementar o código, você irá usar 2 modulos, que será um `Adapter` e um `UseFetch`.

## Como usar?
No Código `example.ts` você pode ver um exemplo de uso.

### Vamos entender os passos de como se usa o useFetch, que está aplicado ao conceito de DIP.

Se você quiser exercer boas práticas, crie uma interface para representar os dados que você
quer receber da API.

```typescript
interface user {
    id: number;
    name: string;
    role: string;
}
```

Você pode globalmente criar uma classe que vai ser usada em todas as páginas, você vai 
precisar apenas da base url da API que você vai usar.

No projeto, no desenvolvimento geralmente é `http://localhost:${PORTA}`. Então é esse
que você vai colocar na criação da classe.

```typescript
const HTTPCLIENT = new UseAxiosAdapter<user>("http://sua/api");
```
Usar uma interface quando se Instancia o Adapter não é obrigatório

```typescript
const HTTPCLIENT = new UseAxiosAdapter("http://sua/api");
```

A partir de agora, você pode fazer requisições usando a classe `UseFetch`.

Sempre que você quiser fazer uma requisição em algum local, você pode Instanciar essa classe.

Ela tem algums paramentros que você deve prestar atenção, sendo eles:
- `Http client`: Esse você já sabe quem é
- `request`: Você pode passar um objeto vazio

Em `request` que você vai dizer a rota, método e outras informações que uma requisição http precisa.

```typescript
const useFetch = new UseFetch<user>(http_client, {
    endpoint: "/qualquer/rota",
    method: "get",
});
```
* **Variações**:
```typescript
const useFetch = new UseFetch(http_client, {
    endpoint: "/qualquer/rota",
    method: "get",
});
```

```typescript
const useFetch = new UseFetch<user>(http_client, {});
```

```typescript
const useFetch = new UseFetch(http_client, {});
```

Por fim, você executa o fetch usando um método da classe instanciada. 

**Atenção!**

Para você fazer o uso, a partir desse momento, você deve usar um custom Hook. 
Veja o exemplo abaixo:

```typescript
useEffect(() => {
    async function getUser(){
        const {body: user} = await useFetch.useFetch();
        setUser(user);
    }

    getUser();
}, []);
```

Lembra que na criação da classe `const useFetch = new UseFetch(httpClient, request)` você não precisava passar algo dentro da request?

Isso porque você pode passar no momento em que faz o fetch:

```typescript
async function getUser(){
    const {body: user} = await useFetch.useFetch({
        endpoint: '/users',
        method: 'get',
    });
    setUser(user);
}
```

Ele faz uma junção do que foi colocado em na instância da classe e sobrescreve o que já estivesse definido antes.

### Classe UseFetch

`useFetch` é uma [Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise) então tem que ser executada em uma função assincrona, usando [await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await) ou outra alguma coisa. Você vai receber como retorno dessa função os seguintes parâmetros:

```typescript
type FetchReturns<T = any> = {
    status: HttpStatusCode,
    body: T,
    loading: boolean,
    error: string,
    isSuccess: boolean
}
```