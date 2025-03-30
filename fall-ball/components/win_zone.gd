class_name WinZoneComponent
extends Area2D

signal level_completed  # Signal to handle winning

func _ready():
	connect("body_entered", _on_body_entered)

func _on_body_entered(body):
	print("YOU WIN!!!")
	if body is MetalBallComponent:
		level_completed.emit()  # Signal for level complete
