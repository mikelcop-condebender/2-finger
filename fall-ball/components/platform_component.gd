class_name PlatformComponent
extends StaticBody2D

@export var is_moving: bool = false  # Enable movement?
@export var move_speed: float = 100.0  # Speed of movement
@export var move_range: float = 50.0  # Max distance to move
@export var move_direction: Vector2 = Vector2.RIGHT  # Default movement direction

var start_position: Vector2
var moving_forward: bool = true

func _ready():
	start_position = global_position

func _physics_process(delta):
	if is_moving:
		move_platform(delta)

func move_platform(delta):
	# Move back and forth within range
	var displacement = move_direction.normalized() * move_speed * delta
	if moving_forward:
		global_position += displacement
		if global_position.distance_to(start_position) >= move_range:
			moving_forward = false
	else:
		global_position -= displacement
		if global_position.distance_to(start_position) <= 0:
			moving_forward = true
