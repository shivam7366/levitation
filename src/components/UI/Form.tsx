import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitForm } from "../../states/actions/LoginActions";
import Stepper from "./Stepper";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [files, setFiles] = useState<any>([]);
  const [coordinates, setCoordinates] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleNextStep = (): void => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = (): void => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };
  const handleUpload = (e: any) => {
    e.preventDefault();
    if (selectedFiles) {
      // You can perform file upload logic here
      setFiles([...files, ...selectedFiles]);
      console.log(selectedFiles);
      setSelectedFiles(null);
      console.log(files);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    // Perform form submission logic here
    const data = {
      name: name,
      email: email,
      phone_number: phone,
      address_1: addressLine1,
      address_2: addressLine2,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
      single_file: file,
      multi_ups1: files,
      multi_ups2: "",
      multi_ups3: "",
      geolocation: `${coordinates?.latitude}, ${coordinates?.longitude}`,
    };
    // dispatch(submitForm(data));
    console.log(data);

    // Set form submitted flag to true
    setFormSubmitted(true);
    handleNextStep();
  };

  const validateForm = (): boolean => {
    const validateStep1 = (): boolean => {
      if (name === "" || email === "" || phone === "") {
        return false;
      }
      return true;
    };
    const validateStep2 = (): boolean => {
      if (
        addressLine1 === "" ||
        addressLine2 === "" ||
        city === "" ||
        state === "" ||
        pincode === "" ||
        country === ""
      ) {
        return false;
      }
      return true;
    };
    const validateStep3 = (): boolean => {
      if (file === null) {
        return false;
      }
      return true;
    };

    const validateStep4 = (): boolean => {
      console.log(selectedFiles);
      if (selectedFiles?.length === 0 || coordinates === null) {
        return false;
      }
      return true;
    };

    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();

      default:
        return false;
    }
  };

  const captureGeolocation = (e: any) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error capturing geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleReset = (): void => {
    setCurrentStep(1);
    navigate("/");
    localStorage.clear();
  };

  return (
    <div>
      <div className="flex flex-col gap-10 mt-5 items-center justify-center">
        <Stepper currentStep={currentStep} />
      </div>

      <form className="max-w-md mx-auto mt-4 p-4 bg-white shadow-md">
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 1: Basic Details
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Step 2: Address</h2>
            <input
              type="text"
              placeholder="Address Line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Step 3: File Upload</h2>
            <input
              type="file"
              accept=".png, .pdf"
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
              className="mb-4"
            />
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Step 3:Multiple File Upload
            </h2>
            <input
              type="file"
              multiple
              accept=".png, .pdf"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button onClick={handleUpload}>Upload</button>
            <button
              onClick={captureGeolocation}
              className={`mt-3 px-4 py-2 bg-green-500 text-white rounded focus:outline-none`}
            >
              Capture Geolocation {coordinates && "✅"}
            </button>
            {coordinates && (
              <p>
                Latitude: {coordinates.latitude}, Longitude:{" "}
                {coordinates.longitude}
              </p>
            )}
          </div>
        )}

        {/* Add other steps and fields here */}

        {formSubmitted && currentStep === 5 ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold">Form Submitted!</h2>
            <p>Thank you for submitting the form.</p>
            <button
              onClick={handleReset}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
              >
                Previous
              </button>
            )}

            {currentStep !== 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!validateForm()}
                className={`px-4 py-2 ${
                  !validateForm()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500"
                } text-white rounded focus:outline-none`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!validateForm()}
                className={`px-4 py-2 ${
                  !validateForm()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500"
                } text-white rounded focus:outline-none`}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
