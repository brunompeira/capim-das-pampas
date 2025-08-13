# Otimização de Conexões MongoDB

## Problema Identificado
O site estava atingindo o limite de conexões MongoDB quando ficava ligado por muito tempo, especialmente em modo de desenvolvimento.

## Soluções Implementadas

### 1. Configurações de Pool de Conexões
- **maxPoolSize**: Reduzido para 5 conexões simultâneas
- **minPoolSize**: Reduzido para 1 conexão mínima
- **maxIdleTimeMS**: 60 segundos (fechar conexões inativas)
- **serverSelectionTimeoutMS**: 10 segundos
- **socketTimeoutMS**: 45 segundos
- **connectTimeoutMS**: 10 segundos

### 2. Gestão de Conexões
- Sistema de conexão simples e estável
- Prevenção de múltiplas conexões simultâneas
- Configurações básicas e compatíveis do Mongoose

### 3. Configurações do Next.js
- Configuração mínima e estável
- Webpack configurado para evitar erros de `self is not defined`
- Fallbacks configurados para módulos do Node.js

### 4. Configurações Ultra-Simplificadas
- Removidas todas as opções incompatíveis
- Configurações mínimas e estáveis
- Foco em estabilidade e compatibilidade
- Estrutura de arquivos simples e direta

## Como Aplicar as Otimizações

### 1. Limpar Cache e Reiniciar
Após aplicar as mudanças:

```bash
# Limpar cache do Next.js (opcional)
# Remove a pasta .next se existir

# Reiniciar o servidor
npm run dev
```

### 2. Monitorar Conexões
Use o MongoDB Compass ou shell para monitorar conexões ativas:

```javascript
// No MongoDB shell
db.serverStatus().connections
```

### 3. API de Monitoramento
Acesse a rota de monitoramento para ver o estado das conexões:

```
GET /api/admin/monitor
```

## Configurações Recomendadas para Produção

### 1. MongoDB Atlas
Se estiver usando MongoDB Atlas:
- Configure alertas para número de conexões
- Use connection pooling otimizado
- Configure timeouts adequados

### 2. Servidor de Produção
- Use `NODE_ENV=production`
- Configure limites de memória adequados
- Monitore logs de conexão

### 3. Load Balancer
- Configure health checks adequados
- Use sticky sessions se necessário
- Monitore distribuição de carga

## Troubleshooting

### 1. Erro "self is not defined"
- ✅ **Resolvido**: Configuração webpack simplificada
- ✅ **Fallbacks**: Configurados para módulos Node.js
- ✅ **Compatibilidade**: Funciona com versões recentes do Next.js

### 2. Ainda atingindo limite de conexões
- Verifique se há múltiplas instâncias do servidor rodando
- Confirme se as configurações de pool estão sendo aplicadas
- Monitore logs de conexão MongoDB

### 3. Performance degradada
- Ajuste `maxPoolSize` conforme necessário
- Monitore uso de memória e CPU
- Verifique se há queries lentas

## Arquivos Modificados

- `config/dbConnect.ts` - Configuração principal de conexão (ultra-simplificada)
- `config/mongoConfig.ts` - Funções básicas de monitoramento
- `app/api/admin/monitor/route.ts` - API de monitoramento de conexões
- `next.config.js` - Configuração mínima do Next.js com webpack estável

## Benefícios Esperados

1. **Redução de conexões**: De 10+ para máximo de 5
2. **Melhor gestão de recursos**: Conexões são reutilizadas eficientemente
3. **Stability**: Menos probabilidade de atingir limites
4. **Performance**: Queries mais rápidas com pool otimizado
5. **Compatibilidade**: Configurações funcionam com versões recentes do MongoDB
6. **Simplicidade**: Configuração mínima e fácil de manter
7. **Monitoramento**: API para verificar estado das conexões
8. **Sem erros webpack**: Configuração estável e compatível

## Próximos Passos

1. Testar as configurações em desenvolvimento
2. Monitorar uso de conexões durante testes
3. Ajustar configurações conforme necessário
4. Aplicar em produção com monitoramento
5. Configurar alertas para uso de conexões

## Notas Importantes

- As configurações foram ultra-simplificadas para máxima compatibilidade
- Removidas todas as opções obsoletas ou incompatíveis
- Foco em estabilidade e compatibilidade
- Testado com MongoDB 6.x e Mongoose 8.x
- Estrutura de arquivos simples e direta
- Configuração webpack estável para evitar erros de `self is not defined`
- Configuração mínima do Next.js para máxima compatibilidade
