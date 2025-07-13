package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index.html";
    }

    // Forward all non-API and non-static routes to index.html for React Router
    @GetMapping(value = "/{path:^(?!api|static).*$}/**")
    public String redirect() {
        return "index.html";
    }
} 