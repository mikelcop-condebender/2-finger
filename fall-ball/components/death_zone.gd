class_name DeathZoneComponent
extends Area2D

signal ball_fell  # Signal to restart or handle game logic

func _ready():
	connect("body_entered", _on_body_entered)

func _on_body_entered(body):
	print("YOU LOOSE")
	if body is MetalBallComponent:
		ball_fell.emit()  # Emit signal for game logic
		body.queue_free()  # Remove ball (you can respawn instead)
