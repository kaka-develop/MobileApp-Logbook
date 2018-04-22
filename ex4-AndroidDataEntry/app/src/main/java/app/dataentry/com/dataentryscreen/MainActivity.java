package app.dataentry.com.dataentryscreen;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText mActivityName;
    private EditText mReportName;
    private EditText mActivityDate;
    private EditText mLocationName;
    private EditText mAttendingTime;
    private Button mBtnSubmit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // find edit fields on view with ids
        mActivityName = (EditText) findViewById(R.id.activity_name);
        mReportName = (EditText) findViewById(R.id.report_name);
        mActivityDate = (EditText) findViewById(R.id.activity_date);
        mLocationName = (EditText) findViewById(R.id.location_name);
        mAttendingTime = (EditText) findViewById(R.id.attending_time);

        // find submit button and set its onClick event
        mBtnSubmit = (Button) findViewById(R.id.btn_submit);
        mBtnSubmit.setOnClickListener(this);
    }

    private void reset() {
        mActivityName.setText("");
        mReportName.setText("");
        mActivityDate.setText("");
        mLocationName.setText("");
        mAttendingTime.setText("");
    }


    @Override
    public void onClick(View v) {
        if (checkRequired(mActivityName) &&
                checkRequired(mReportName) &&
                checkDate(mActivityDate)) {
            if (!mAttendingTime.getText().toString().isEmpty())
                if (!checkTime(mAttendingTime))
                    return;

            addNewEvent();
        }
    }

    private boolean checkRequired(EditText editText){
        if (!MainValidation.checkEmpty(editText.getText().toString()))
            return true;
        else
            editText.setError(MainValidError.REQUIRED);
        return false;
    }


    private boolean checkDate(EditText editText){
        if (MainValidation.validateDate(editText.getText().toString()))
            return true;
        else
            editText.setError(MainValidError.DATE);
        return false;
    }

    private boolean checkTime(EditText editText){
        if (MainValidation.validateTime(editText.getText().toString()))
            return true;
        else
            editText.setError(MainValidError.TIME);
        return false;
    }


    private void addNewEvent() {
        Toast.makeText(this, "Add new event successfully!", Toast.LENGTH_LONG).show();
        reset();
    }
}

