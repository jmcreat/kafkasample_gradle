package kafka.publisher.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import kafka.publisher.domain.Pong;
import kafka.publisher.domain.Ping;

@Component
public class PingService{
	@Autowired
    private KafkaTemplate<String, Ping> pingKafkaTemplate;

    @Value(value = "${ping.topic.name}")
    private String pingTopicName;
    
    public Pong pingAndPong(Ping ping) throws Exception {
    	ListenableFuture<SendResult<String, Ping>> future = pingKafkaTemplate.send(pingTopicName, ping);

        future.addCallback(new ListenableFutureCallback<SendResult<String, Ping>>() {
            @Override
            public void onSuccess(SendResult<String, Ping> result) {
                Ping g = result.getProducerRecord().value();
                System.out.println("Sent message=[" + g.toString() + "] with offset=[" + result.getRecordMetadata().offset() + "]");
            }

            @Override
            public void onFailure(Throwable ex) {
                System.out.println( "Unable to send message=[" + ping.toString() + "] due to : " + ex.getMessage());
            }
        });
        return new Pong("Son","Hello~!");
    }
}