package kafka.publisher.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kafka.publisher.domain.Pong;
import kafka.publisher.domain.Ping;
import kafka.publisher.service.PingService;

@RestController
@RequestMapping(value = "/kafka")
public class KafkaPublisherController {

    @Autowired
    PingService pingService;

    @RequestMapping(value = "/publish", method=RequestMethod.POST)
    public Pong pingAndPong(@RequestBody final Ping ping) throws Exception {
        return pingService.pingAndPong(ping);
    }
}
