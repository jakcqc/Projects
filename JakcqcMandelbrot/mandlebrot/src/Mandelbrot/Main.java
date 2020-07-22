/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Mandelbrot;

import Mandelbrot.Switchable;
import javafx.application.Application;
import static javafx.application.Application.launch;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.HBox;
import javafx.scene.text.Text;
import javafx.stage.Stage;

/**
 *
 * @author zasd180
 */
public class Main extends Application {
    
    @Override
    public void start(Stage stage) throws Exception {
        
        // UI if SceneManager can't switch to a Scene
        HBox root = new HBox();
        root.setPrefSize(300, 200);
        root.setAlignment(Pos.CENTER);
        Text message = new Text("Scene failed to load");
        root.getChildren().add(message);
        
        // create Scene and init UI to show failure in case switch fails
        Scene scene = new Scene(root);
        
        Switchable.scene = scene; 
        Switchable.switchTo("Intro");
        
        stage.setScene(scene);
        stage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }   
}