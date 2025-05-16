## 再現手順

### ダミーサーバ起動

- Dockerコンテナから通信するWebサーバをHost側で起動

```
# ホスト側で実行
node server.js
```

### Docker環境を起動

```
docker compose up -d

# ubuntuコンテナに入る
docker compose exec -it ubuntu bash
```

### Ubuntuコンテナに入ったら、以下のコマンドを実行

- Webサーバにリクエストをし続けるスクリプトを実行する
- 1000リクエストに1回程度、通信がスタックするはず

```
bash ./requeset.sh
```

### 通信がスタックしているときの状況


```
tcpdump -i eth0 host host.docker.internal and port 3000

# SYNパケットが再送されている様子
06:35:33.781514 IP b2f4e21290c6.53822 > 192.168.65.254.3000: Flags [S], seq 435420418, win 64240, options [mss 1460,sackOK,TS val 793930175 ecr 0,nop,wscale 7], length 0
06:35:34.839628 IP b2f4e21290c6.53822 > 192.168.65.254.3000: Flags [S], seq 435420418, win 64240, options [mss 1460,sackOK,TS val 793931231 ecr 0,nop,wscale 7], length 0
06:35:35.863154 IP b2f4e21290c6.53822 > 192.168.65.254.3000: Flags [S], seq 435420418, win 64240, options [mss 1460,sackOK,TS val 793932257 ecr 0,nop,wscale 7], length 0
06:35:36.885050 IP b2f4e21290c6.53822 > 192.168.65.254.3000: Flags [S], seq 435420418, win 64240, options [mss 1460,sackOK,TS val 793933279 ecr 0,nop,wscale 7], length 0
06:35:37.910111 IP b2f4e21290c6.53822 > 192.168.65.254.3000: Flags [S], seq 435420418, win 64240, options [mss 1460,sackOK,TS val 793934304 ecr 0,nop,wscale 7], length 0
```

```
netstat -an | grep 3000

# 通信がスタックした瞬間のnetstatの結果
# SYN_SENTの状態が続く
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      1 b2f4e21290c6:48282      192.168.65.254:3000     SYN_SENT
```
