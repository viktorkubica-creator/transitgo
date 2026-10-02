// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "TransitGoApp",
    platforms: [
        .iOS(.v16)
    ],
    products: [
        .executable(name: "TransitGoApp", targets: ["TransitGoApp"])
    ],
    targets: [
        .executableTarget(
            name: "TransitGoApp",
            resources: [
                .process("Resources")
            ]
        )
    ]
)
